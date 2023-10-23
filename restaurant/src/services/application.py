from typing import Optional, List

from exceptions import PermissionDeniedError, RestaurantApplicationNotFoundWithIdError, \
    RestaurantManagerNotFoundWithIdError
from models import RestaurantApplication, Moderator, ApplicationType
from roles import ModeratorRole
from schemas import RestaurantApplicationRetrieveOut
from uow import SqlAlchemyUnitOfWork
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
            PermissionDeniedError: If the user is not a moderator.
            RestaurantApplicationNotFoundWithIdError: If no RestaurantApplication is found with the provided ID.
        """

        # Permission checks
        if not self._moderator:
            raise PermissionDeniedError(ModeratorRole)

        retrieved_instance = await uow.restaurant_applications.retrieve(id, **kwargs)

        if not retrieved_instance:
            raise RestaurantApplicationNotFoundWithIdError(id)

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
        if not self._moderator:
            raise PermissionDeniedError(ModeratorRole)

        return await uow.restaurant_applications.list(**kwargs)

    async def list_create_application_instances(self, uow: SqlAlchemyUnitOfWork,
                                                **kwargs) -> List[RestaurantApplication]:
        """
        List all create restaurant applications from the database.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[RestaurantApplication]: A list of create restaurant applications.

        Raises:
            PermissionDeniedError: If the user is not a moderator.
        """

        # Permission checks
        if not self._moderator:
            raise PermissionDeniedError(ModeratorRole)

        return await uow.restaurant_applications.list_create_applications(**kwargs)

    async def list_update_application_instances(self, uow: SqlAlchemyUnitOfWork,
                                                **kwargs) -> List[RestaurantApplication]:
        """
        List all update restaurant applications from the database.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[RestaurantApplication]: A list of update restaurant applications.

        Raises:
            PermissionDeniedError: If the user is not a moderator.
        """

        # Permission checks
        if not self._moderator:
            raise PermissionDeniedError(ModeratorRole)

        return await uow.restaurant_applications.list_update_applications(**kwargs)

    async def list_create_applications(self, uow: SqlAlchemyUnitOfWork,
                                       **kwargs) -> List[RestaurantApplicationRetrieveOut]:
        """
        List all create restaurant applications.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[RestaurantApplicationRetrieveOut]: A list of create restaurant applications.
        """

        instance_list = await self.list_create_application_instances(uow, **kwargs)
        return super().get_list_schema(instance_list)

    async def list_update_applications(self, uow: SqlAlchemyUnitOfWork,
                                       **kwargs) -> List[RestaurantApplicationRetrieveOut]:
        """
        List all update restaurant applications.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[RestaurantApplicationRetrieveOut]: A list of update restaurant applications.
        """

        instance_list = await self.list_update_application_instances(uow, **kwargs)
        return super().get_list_schema(instance_list)

    async def confirm_application(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Confirm the application with the given ID and create a restaurant.

        Args:
            id (int): The ID of the application to confirm.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantManagerNotFoundWithIdError: If the restaurant manager is not found.
        """

        # # Permission checks
        # if self._moderator:
        #     check_moderator_is_active(self._moderator)
        # else:
        #     raise PermissionDeniedError(ModeratorRole)
        #
        # restaurant_application_instance = await uow.restaurant_applications.retrieve(id, **kwargs)
        #
        # if not restaurant_application_instance:
        #     raise RestaurantApplicationNotFoundWithIdError(id)
        #
        # restaurant_application = super().get_retrieve_schema(restaurant_application_instance)

        restaurant_application = await super().retrieve(id, uow, **kwargs)

        # Get restaurant data and restaurant manager
        data = restaurant_application.model_dump()
        restaurant_manager_id = data.pop('restaurant_manager_id')
        restaurant_manager = await uow.managers.retrieve(restaurant_manager_id)

        if not restaurant_manager:
            raise RestaurantManagerNotFoundWithIdError(restaurant_manager_id)

        # Create or update restaurant, delete an application and set restaurant manager to restaurant if created
        application_type = data.pop('type')
        del data['id']

        if application_type == ApplicationType.create:
            restaurant = await uow.restaurants.create(data)
            restaurant_manager.restaurant_id = restaurant.id
        elif application_type == ApplicationType.update:
            await uow.restaurants.update(restaurant_manager.restaurant_id, data)

        await uow.restaurant_applications.delete(id)

    async def decline_application(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Declines a restaurant application with the given ID.

        Args:
            id (int): The ID of the restaurant application.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not the moderator.
            RestaurantApplicationNotFoundWithIdError: If the restaurant application with the given ID does not exist.
        """

        # Permission checks
        if not self._moderator:
            raise PermissionDeniedError(ModeratorRole)

        if not await uow.restaurant_applications.exists(id):
            raise RestaurantApplicationNotFoundWithIdError(id)

        await uow.restaurant_applications.delete(id, **kwargs)
