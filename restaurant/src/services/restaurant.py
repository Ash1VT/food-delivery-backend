from typing import List, Optional

from fastapi import UploadFile
from loguru import logger

from producer import publisher, RestaurantCreatedEvent, RestaurantUpdatedEvent
from user_roles import ModeratorRole, RestaurantManagerRole
from exceptions import PermissionDeniedError
from exceptions.manager import RestaurantManagerAlreadyHaveApplicationError, RestaurantManagerAlreadyHaveRestaurantError
from exceptions.restaurant import RestaurantNotFoundWithIdError, RestaurantNotActiveError, \
    RestaurantAlreadyActiveError, RestaurantAlreadyNotActiveError
from schemas.restaurant import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantUpdateIn
from schemas.application import RestaurantApplicationCreateOut
from models import Restaurant, Moderator, RestaurantManager, RestaurantApplication, ApplicationType
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_ownership_on_restaurant
from utils.firebase import upload_to_firebase
from .mixins import RetrieveMixin, ListMixin, CreateMixin, UpdateMixin, DeleteMixin

__all__ = [
    "RestaurantService",
]


class RestaurantService(RetrieveMixin[Restaurant, RestaurantRetrieveOut],
                        ListMixin[Restaurant, RestaurantRetrieveOut],
                        CreateMixin[RestaurantApplication, RestaurantCreateIn,
                        RestaurantApplicationCreateOut],
                        UpdateMixin[RestaurantApplication, RestaurantUpdateIn,
                        RestaurantApplicationCreateOut],
                        DeleteMixin[Restaurant]):
    """
    Service class for managing restaurants.

    This class provides methods for retrieving, listing, creating, updating, deleting,
        activating and deactivating restaurant instances.

    Attributes:
        schema_retrieve_out (RestaurantRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (RestaurantApplicationCreateOut): The schema for output representation of created instances.
        schema_update_out (RestaurantApplicationCreateOut): The schema for output representation of updated instances.
    """

    schema_retrieve_out = RestaurantRetrieveOut
    schema_create_out = RestaurantApplicationCreateOut
    schema_update_out = RestaurantApplicationCreateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None,
                 moderator: Optional[Moderator] = None):
        """
        Initializes a new instance of the RestaurantService class.

        Args:
            restaurant_manager (Optional[RestaurantManager]): An optional instance of the RestaurantManager class.
            moderator (Optional[Moderator]): An optional instance of the Moderator class.
        """

        self._restaurant_manager = restaurant_manager
        self._moderator = moderator

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> Restaurant:
        """
        Retrieves a restaurant instance by its ID.

        Args:
            id (int): The ID of the restaurant to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Restaurant: The retrieved restaurant instance.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            RestaurantNotActiveError: If the retrieved restaurant is not active
                and the user is not a moderator or manager.
        """

        retrieved_instance = await uow.restaurants.retrieve(id, fetch_working_hours=True, **kwargs)

        # Check for existence
        if not retrieved_instance:
            logger.warning(f"Restaurant with id={id} not found.")
            raise RestaurantNotFoundWithIdError(id)

        # Permission checks if not active
        if not retrieved_instance.is_active:
            if not self._restaurant_manager and not self._moderator:
                logger.warning(f"Restaurant with id={id} is not active and "
                               f"the authenticated user is not a Moderator or RestaurantManager.")
                raise RestaurantNotActiveError(retrieved_instance.id)

        logger.info(f"Retrieved restaurant with id={id}.")
        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[Restaurant]:
        """
        List instances of the Restaurant class.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[Restaurant]: A list of Restaurant instances with the working hours fetched.
        """

        # Permission checks
        if self._moderator:
            logger.info(f"Listing all restaurants for Moderator with id={self._moderator.id}.")
            return await uow.restaurants.list(fetch_working_hours=True, **kwargs)

        active_restaurants = await uow.restaurants.list_active_restaurants(fetch_working_hours=True, **kwargs)

        logger.info(f"Listing all active restaurants.")

        return active_restaurants

    async def create_instance(self, item: RestaurantCreateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantApplication:
        """
        Create an application for creating a restaurant.

        Args:
            item (RestaurantCreateIn): The input data for creating the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantApplication: The created restaurant application.

        Raises:
            PermissionDeniedError: If the user is not the restaurant manager.
            RestaurantManagerAlreadyHaveRestaurantError: If the restaurant manager already has a restaurant.
            RestaurantManagerAlreadyHaveApplicationError: If the restaurant manager already has an application
                of type create.
        """

        # Permission checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager.")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check if restaurant manager already has a restaurant
        # if await uow.restaurants.exists(self._restaurant_manager.restaurant_id):
        if self._restaurant_manager.restaurant_id is not None:
            logger.warning(f"RestaurantManager with id={self._restaurant_manager.id} already has a "
                           f"Restaurant with id={self._restaurant_manager.restaurant_id}.")
            raise RestaurantManagerAlreadyHaveRestaurantError(self._restaurant_manager)

        # Check if restaurant manager already has create application
        if await uow.restaurant_applications.exists_for_manager(self._restaurant_manager.id, ApplicationType.create):
            logger.warning(f"RestaurantManager with id={self._restaurant_manager.id} "
                           f"already has an application of type create.")
            raise RestaurantManagerAlreadyHaveApplicationError(self._restaurant_manager, ApplicationType.create)

        # Create an application for create
        data = item.model_dump()
        data["restaurant_manager_id"] = self._restaurant_manager.id
        data["type"] = ApplicationType.create
        created_instance = await uow.restaurant_applications.create(data)

        logger.info(f"Created RestaurantApplication with id={created_instance.id} and type=create.")

        return created_instance

    async def update_instance(self, id: int, item: RestaurantUpdateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantApplication:
        """
        Create an application for updating a restaurant.

        Args:
            id (int): The ID of the restaurant to update.
            item (RestaurantUpdateIn): The data used to update the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantApplication: The created restaurant application.

        Raises:
            PermissionDeniedError: If the user is not the restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            RestaurantManagerAlreadyHaveApplicationError: If the restaurant manager already has an application.
        """

        # Permission checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager.")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check for existence
        if not await uow.restaurants.exists(id):
            logger.warning(f"Restaurant with id={id} not found.")
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Check if restaurant manager already has an update application
        if await uow.restaurant_applications.exists_for_manager(self._restaurant_manager.id, ApplicationType.update):
            logger.warning(f"RestaurantManager with id={self._restaurant_manager.id} "
                           f"already has an application of type update.")
            raise RestaurantManagerAlreadyHaveApplicationError(self._restaurant_manager, ApplicationType.update)

        # Create an application for update
        data = item.model_dump()
        data["restaurant_manager_id"] = self._restaurant_manager.id
        data["type"] = ApplicationType.update
        created_instance = await uow.restaurant_applications.create(data)

        logger.info(f"Created RestaurantApplication with id={created_instance.id} and type=update.")

        return created_instance

    async def upload_image(self, id: int, file: UploadFile, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Uploads an image for the restaurant with the given ID.

        Args:
            id (int): The ID of the restaurant to upload the image for.
            file (UploadFile): The image file to upload.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not the restaurant manager or moderator.
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
        """

        # Permission checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager.")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check for existence
        if not await uow.restaurants.exists(id):
            logger.warning(f"Restaurant with id={id} not found.")
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Get image url
        image_url = upload_to_firebase(id, file)

        # Upload image
        await uow.restaurants.update(id, {
            'image_url': image_url
        })

        logger.info(f"Uploaded image for restaurant with id={id}.")

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Deletes an instance by the given ID.

        Args:
            id (int): The ID of the instance to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not the restaurant manager or moderator.
            RestaurantNotFoundWithIdError: If the instance with the given ID does not exist.
        """

        # Permission checks
        if not self._restaurant_manager and not self._moderator:
            logger.warning(f"User is not a restaurant manager or moderator.")
            raise PermissionDeniedError(RestaurantManagerRole, ModeratorRole)

        # Check for existence
        if not await uow.restaurants.exists(id):
            logger.warning(f"Restaurant with id={id} not found.")
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        if self._restaurant_manager:
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Delete
        await uow.restaurants.delete(id, **kwargs)
        logger.info(f"Deleted restaurant with id={id}.")

    async def activate_restaurant(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Activates a restaurant by setting its `is_active` attribute to True.

        Args:
            id (int): The ID of the restaurant to activate.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not the moderator.
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            RestaurantAlreadyActiveError: If the restaurant is already active.
        """

        # Permission checks
        if not self._restaurant_manager and not self._moderator:
            logger.warning(f"User is not a restaurant manager or moderator.")
            raise PermissionDeniedError(RestaurantManagerRole, ModeratorRole)

        retrieved_restaurant = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_restaurant:
            logger.warning(f"Restaurant with id={id} not found.")
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        if self._restaurant_manager:
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Check if restaurant is not active already
        if retrieved_restaurant.is_active:
            logger.warning(f"Restaurant with id={id} is already active.")
            raise RestaurantAlreadyActiveError(retrieved_restaurant.id)

        retrieved_restaurant.is_active = True

        logger.info(f"Activated restaurant with id={id}.")

        publisher.publish(
            RestaurantUpdatedEvent(
                id=retrieved_restaurant.id,
                is_active=retrieved_restaurant.is_active
            )
        )

    async def deactivate_restaurant(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Deactivates a restaurant by setting its `is_active` attribute to False.

        Args:
            id (int): The ID of the restaurant to deactivate.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not the moderator or restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            RestaurantAlreadyNotActiveError: If the restaurant is already not active.
        """

        # Permission checks
        if not self._restaurant_manager and not self._moderator:
            logger.warning(f"User is not a restaurant manager or moderator.")
            raise PermissionDeniedError(RestaurantManagerRole, ModeratorRole)

        retrieved_restaurant = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_restaurant:
            logger.warning(f"Restaurant with id={id} not found.")
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        if self._restaurant_manager:
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Check if restaurant is active already
        if not retrieved_restaurant.is_active:
            logger.warning(f"Restaurant with id={id} is already not active.")
            raise RestaurantAlreadyNotActiveError(retrieved_restaurant.id)

        retrieved_restaurant.is_active = False

        logger.info(f"Deactivated restaurant with id={id}.")

        publisher.publish(
            RestaurantUpdatedEvent(
                id=retrieved_restaurant.id,
                is_active=retrieved_restaurant.is_active
            )
        )
