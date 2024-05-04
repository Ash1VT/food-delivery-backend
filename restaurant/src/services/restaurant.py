from typing import List, Optional

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
            raise RestaurantNotFoundWithIdError(id)

        # Permission checks if not active
        if not retrieved_instance.is_active:
            if not self._restaurant_manager and not self._moderator:
                raise RestaurantNotActiveError(retrieved_instance.id)

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
            return await uow.restaurants.list(fetch_working_hours=True, **kwargs)

        return await uow.restaurants.list_active_restaurants(fetch_working_hours=True, **kwargs)

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
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check if restaurant manager already has a restaurant
        # if await uow.restaurants.exists(self._restaurant_manager.restaurant_id):
        if self._restaurant_manager.restaurant_id is not None:
            raise RestaurantManagerAlreadyHaveRestaurantError(self._restaurant_manager)

        # Check if restaurant manager already has create application
        if await uow.restaurant_applications.exists_for_manager(self._restaurant_manager.id, ApplicationType.create):
            raise RestaurantManagerAlreadyHaveApplicationError(self._restaurant_manager, ApplicationType.create)

        # Create an application for create
        data = item.model_dump()
        data["restaurant_manager_id"] = self._restaurant_manager.id
        data["type"] = ApplicationType.create
        return await uow.restaurant_applications.create(data)

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
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check for existence
        if not await uow.restaurants.exists(id):
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Check if restaurant manager already has an update application
        if await uow.restaurant_applications.exists_for_manager(self._restaurant_manager.id, ApplicationType.update):
            raise RestaurantManagerAlreadyHaveApplicationError(self._restaurant_manager, ApplicationType.update)

        # Create an application for update
        data = item.model_dump()
        data["restaurant_manager_id"] = self._restaurant_manager.id
        data["type"] = ApplicationType.update
        return await uow.restaurant_applications.create(data)

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
            raise PermissionDeniedError(RestaurantManagerRole, ModeratorRole)

        # Check for existence
        if not await uow.restaurants.exists(id):
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        if self._restaurant_manager:
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Delete
        await uow.restaurants.delete(id, **kwargs)

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
            raise PermissionDeniedError(RestaurantManagerRole, ModeratorRole)

        retrieved_restaurant = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_restaurant:
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        if self._restaurant_manager:
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Check if restaurant is not active already
        if retrieved_restaurant.is_active:
            raise RestaurantAlreadyActiveError(retrieved_restaurant.id)

        retrieved_restaurant.is_active = True

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
            raise PermissionDeniedError(RestaurantManagerRole, ModeratorRole)

        retrieved_restaurant = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_restaurant:
            raise RestaurantNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        if self._restaurant_manager:
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)

        # Check if restaurant is active already
        if not retrieved_restaurant.is_active:
            raise RestaurantAlreadyNotActiveError(retrieved_restaurant.id)

        retrieved_restaurant.is_active = False

        publisher.publish(
            RestaurantUpdatedEvent(
                id=retrieved_restaurant.id,
                is_active=retrieved_restaurant.is_active
            )
        )
