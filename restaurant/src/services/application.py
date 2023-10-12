from typing import Optional, List

from exceptions import PermissionDeniedError, RestaurantApplicationNotFoundWithIdError, \
    RestaurantManagerNotFoundWithIdError
from models import RestaurantApplication, Moderator
from schemas import RestaurantApplicationRetrieveOut
from uow import SqlAlchemyUnitOfWork
from utils import check_moderator_is_active
from .mixins import RetrieveMixin, ListMixin

__all__ = [
    "RestaurantApplicationService",
]


class RestaurantApplicationService(RetrieveMixin[RestaurantApplication, RestaurantApplicationRetrieveOut],
                                   ListMixin[RestaurantApplication, RestaurantApplicationRetrieveOut]):
    """
    Service class for managing restaurant applications.

    This class provides methods for retrieving, listing, confirming and declining restaurant applications.

    Attributes:
        schema_retrieve_out (RestaurantApplicationRetrieveOut): The schema for output representation of
            retrieved instances.
    """

    schema_retrieve_out = RestaurantApplicationRetrieveOut

    def __init__(self, moderator: Optional[Moderator] = None):
        """
        Initializes a new instance of the RestaurantApplicationService class.

        Args:
            moderator (Optional[Moderator]): An optional instance of the Moderator class.
        """

        self._moderator = moderator

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantApplication:
        """
        Retrieve an instance of RestaurantApplication from the database based on the provided ID.

        Parameters:
            id (int): The ID of the RestaurantApplication to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantApplication: The retrieved instance of RestaurantApplication.

        Raises:
            RestaurantApplicationNotFoundWithIdError: If no RestaurantApplication is found with the provided ID.
            PermissionDeniedError: If the user is not a moderator.
        """

        retrieved_instance = await uow.restaurant_applications.retrieve(id, **kwargs)

        if not retrieved_instance:
            raise RestaurantApplicationNotFoundWithIdError(id)

        # Permission checks
        if self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[RestaurantApplication]:
        """
        List all instances of RestaurantApplication from the database.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[RestaurantApplication]: A list of restaurant applications.

        Raises:
            PermissionDeniedError: If the user is not a moderator.
        """

        # Permission checks
        if self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        return await uow.restaurant_applications.list(**kwargs)

    async def confirm_application(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Confirm the application with the given ID and create a restaurant.

        Args:
            id (int): The ID of the application to confirm.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a moderator.
            RestaurantManagerNotFoundWithIdError: If the restaurant manager is not found.
        """

        restaurant_application = await self.retrieve(id, uow, **kwargs)

        # Permission checks
        if self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        # Get restaurant data and restaurant manager
        data = restaurant_application.model_dump()
        restaurant_manager_id = data.pop('restaurant_manager_id')
        restaurant_manager = await uow.managers.retrieve(restaurant_manager_id)

        if not restaurant_manager:
            raise RestaurantManagerNotFoundWithIdError(restaurant_manager_id)

        # Create restaurant, delete an application and set restaurant manager to restaurant
        restaurant = await uow.restaurants.create(data)
        await uow.restaurant_applications.delete(id)
        restaurant_manager.restaurant_id = restaurant.id

    async def decline_application(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Declines a restaurant application with the given ID.

        Args:
            id (int): The ID of the restaurant application.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantApplicationNotFoundWithIdError: If the restaurant application with the given ID does not exist.
            PermissionDeniedError: If the user is not the moderator.
        """

        if not await uow.restaurant_applications.exists(id):
            raise RestaurantApplicationNotFoundWithIdError(id)

        # Permission checks
        if self._moderator:
            check_moderator_is_active(self._moderator)
        else:
            raise PermissionDeniedError()

        await uow.restaurant_applications.delete(id, **kwargs)
