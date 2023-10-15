from typing import List, Optional

from schemas.restaurant import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantCreateOut, RestaurantUpdateIn, \
    RestaurantUpdateOut
from models import Restaurant, Moderator, RestaurantManager, RestaurantApplication, ApplicationType
from exceptions import RestaurantNotFoundWithIdError, RestaurantAlreadyExistsWithIdError, RestaurantNotActiveError, \
    PermissionDeniedError
from uow import SqlAlchemyUnitOfWork, GenericUnitOfWork
from utils import check_restaurant_manager_is_active, \
    check_moderator_is_active, check_restaurant_manager_ownership_on_restaurant
from .mixins import RetrieveMixin, ListMixin, CreateMixin, UpdateMixin, DeleteMixin, UpdateIn, Model

__all__ = [
    "RestaurantService",
]


class RestaurantService(RetrieveMixin[Restaurant, RestaurantRetrieveOut],
                        ListMixin[Restaurant, RestaurantRetrieveOut],
                        CreateMixin[Restaurant, RestaurantCreateIn, RestaurantCreateOut],
                        UpdateMixin[Restaurant, RestaurantUpdateIn, RestaurantUpdateOut],
                        DeleteMixin[Restaurant]):
    """
    Service class for managing restaurants.

    This class provides methods for retrieving, listing, creating, updating, deleting,
        activating and deactivating restaurant instances.

    Attributes:
        schema_retrieve_out (RestaurantRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (RestaurantCreateOut): The schema for output representation of created instances.
    """

    schema_retrieve_out = RestaurantRetrieveOut
    schema_create_out = RestaurantCreateOut

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
            if self._restaurant_manager:
                check_restaurant_manager_is_active(self._restaurant_manager)
                check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)
            elif self._moderator:
                check_moderator_is_active(self._moderator)
            else:
                raise RestaurantNotActiveError(retrieved_instance)

        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[Restaurant]:
        """
        List instances of the Restaurant class.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[Restaurant]: A list of Restaurant instances with the working hours fetched.

        Raises:
            PermissionDeniedError: If there is no moderator.
        """

        # Permission checks
        if self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        return await uow.restaurants.list(fetch_working_hours=True, **kwargs)

    async def list_active_restaurant_instances(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[Restaurant]:
        """
        List all active restaurant instances.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[Restaurant]: A list of active restaurant instances.
        """

        return await uow.restaurants.list_active_restaurants(fetch_working_hours=True, **kwargs)

    async def create_instance(self, item: RestaurantCreateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantApplication:
        """
        Creates a new restaurant instance.

        Args:
            item (RestaurantCreateIn): The input data for creating the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantApplication: The created restaurant application for the creation.

        Raises:
            PermissionDeniedError: If the user is not the restaurant manager.
        """

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
        else:
            raise PermissionDeniedError()

        # Create an application for create
        data = item.model_dump()
        data["restaurant_manager_id"] = self._restaurant_manager.id
        data["application_type"] = ApplicationType.create
        return await uow.restaurant_applications.create(data)

    async def update_instance(self, id: int, item: RestaurantUpdateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantApplication:
        """
        Update an instance of a restaurant.

        Args:
            id (int): The ID of the restaurant to update.
            item (RestaurantUpdateIn): The data used to update the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantApplication: The created restaurant application for the update.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            PermissionDeniedError: If the user is not the restaurant manager.
        """

        # Check for existence
        if not await uow.restaurants.exists(id):
            raise RestaurantNotFoundWithIdError(id)

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)
        else:
            raise PermissionDeniedError()

        # Create an application for update
        data = item.model_dump()
        data["restaurant_manager_id"] = self._restaurant_manager.id
        data["application_type"] = ApplicationType.update
        return await uow.restaurant_applications.create(data)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Deletes an instance by the given ID.

        Args:
            id (int): The ID of the instance to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantNotFoundWithIdError: If the instance with the given ID does not exist.
            PermissionDeniedError: If the user is not the restaurant manager or moderator.
        """

        # Check for existence
        if not await uow.restaurants.exists(id):
            raise RestaurantNotFoundWithIdError(id)

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)
        elif self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        # Delete
        await uow.restaurants.delete(id, **kwargs)

    async def list_active_restaurants(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[RestaurantRetrieveOut]:
        instance_list = await self.list_active_restaurant_instances(uow, **kwargs)
        return super().get_list_schema(instance_list)

    async def activate_restaurant(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Activates a restaurant by setting its `is_active` attribute to True.

        Args:
            id (int): The ID of the restaurant to activate.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            PermissionDeniedError: If the user is not the moderator.
        """

        retrieved_restaurant = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_restaurant:
            raise RestaurantNotFoundWithIdError(id)

        # Permission checks
        if self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        retrieved_restaurant.is_active = True

    async def deactivate_restaurant(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Deactivates a restaurant by setting its `is_active` attribute to False.

        Args:
            id (int): The ID of the restaurant to deactivate.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            PermissionDeniedError: If the user is not the moderator or restaurant manager.
        """

        retrieved_restaurant = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_restaurant:
            raise RestaurantNotFoundWithIdError(id)

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, id)
        elif self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        retrieved_restaurant.is_active = False
