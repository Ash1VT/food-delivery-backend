from models import RestaurantManager
from schemas.manager import RestaurantManagerRetrieveOut, RestaurantManagerCreateIn, RestaurantManagerCreateOut, \
    RestaurantManagerUpdateIn, RestaurantManagerUpdateOut
from uow import SqlAlchemyUnitOfWork
from exceptions import RestaurantManagerNotFoundWithIdError, RestaurantManagerAlreadyExistsWithIdError

from .mixins import RetrieveMixin, CreateMixin, DeleteMixin, UpdateMixin

__all__ = [
    "RestaurantManagerService",
]


class RestaurantManagerService(RetrieveMixin[RestaurantManager, RestaurantManagerRetrieveOut],
                               CreateMixin[RestaurantManager, RestaurantManagerCreateIn, RestaurantManagerCreateOut],
                               UpdateMixin[RestaurantManager, RestaurantManagerUpdateIn, RestaurantManagerUpdateOut],
                               DeleteMixin[RestaurantManager]):
    """
    Service class for managing restaurant managers.

    This class provides methods for retrieving, creating, updating, deleting restaurant manager instances.

    Attributes:
        schema_retrieve_out (RestaurantManagerRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (RestaurantManagerCreateOut): The schema for output representation of created instances.
        schema_update_out (RestaurantManagerUpdateOut): The schema for output representation of updated instances.
    """

    schema_retrieve_out = RestaurantManagerRetrieveOut
    schema_create_out = RestaurantManagerCreateOut
    schema_update_out = RestaurantManagerUpdateOut

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantManager:
        """
        Retrieve a restaurant manager instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant manager to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantManager: The retrieved restaurant manager instance.

        Raises:
            RestaurantManagerNotFoundWithIdError: If the restaurant manager with the given ID is not found.
        """

        retrieved_instance = await uow.managers.retrieve(id, **kwargs)

        if not retrieved_instance:
            raise RestaurantManagerNotFoundWithIdError(id)

        return retrieved_instance

    async def create_instance(self, item: RestaurantManagerCreateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantManager:
        """
        Create a new restaurant manager instance in the repository.

        Args:
            item (RestaurantManagerCreateIn): The data to create the restaurant manager.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantManager: The created restaurant manager instance.

        Raises:
            RestaurantManagerAlreadyExistsWithIdError: If the restaurant manager with the given ID already exists.
        """

        if await uow.managers.exists(item.id):
            raise RestaurantManagerAlreadyExistsWithIdError(item.id)

        data = item.model_dump()

        return await uow.managers.create(data, **kwargs)

    async def update_instance(self, id: int,
                              item: RestaurantManagerUpdateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantManager:
        """
        Update a restaurant manager instance in the repository.

        Args:
            id (int): The ID of the restaurant manager to update.
            item (RestaurantManagerUpdateIn): The data to update the restaurant manager.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantManager: The updated restaurant manager instance.

        Raises:
            RestaurantManagerNotFoundWithIdError: If the restaurant manager with the given ID is not found.
        """

        if not await uow.managers.exists(id):
            raise RestaurantManagerNotFoundWithIdError(id)

        data = item.model_dump()

        return await uow.managers.update(id, data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a restaurant manager instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant manager to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantManagerNotFoundWithIdError: If the restaurant manager with the given ID is not found.
        """

        if not await uow.managers.exists(id):
            raise RestaurantManagerNotFoundWithIdError(id)

        await uow.managers.delete(id, **kwargs)
