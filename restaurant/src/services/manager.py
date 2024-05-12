from loguru import logger

from models import RestaurantManager
from schemas.manager import RestaurantManagerRetrieveOut, RestaurantManagerCreateIn, RestaurantManagerCreateOut
from uow import SqlAlchemyUnitOfWork
from exceptions import RestaurantManagerNotFoundWithIdError, RestaurantManagerAlreadyExistsWithIdError

from .mixins import RetrieveMixin, CreateMixin, DeleteMixin, UpdateMixin

__all__ = [
    "RestaurantManagerService",
]


class RestaurantManagerService(RetrieveMixin[RestaurantManager, RestaurantManagerRetrieveOut],
                               CreateMixin[RestaurantManager, RestaurantManagerCreateIn, RestaurantManagerCreateOut],
                               DeleteMixin[RestaurantManager]):
    """
    Service class for managing restaurant managers.

    This class provides methods for retrieving, creating, updating, deleting restaurant manager instances.

    Attributes:
        schema_retrieve_out (RestaurantManagerRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (RestaurantManagerCreateOut): The schema for output representation of created instances.
    """

    schema_retrieve_out = RestaurantManagerRetrieveOut
    schema_create_out = RestaurantManagerCreateOut

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
            logger.warning(f"Restaurant manager with id={id} not found.")
            raise RestaurantManagerNotFoundWithIdError(id)

        logger.info(f"Retrieved restaurant manager with id={id}.")
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
            logger.warning(f"Restaurant manager with id={item.id} already exists.")
            raise RestaurantManagerAlreadyExistsWithIdError(item.id)

        data = item.model_dump()

        created_instance = await uow.managers.create(data, **kwargs)

        logger.info(f"Created restaurant manager with id={created_instance.id}.")

        return created_instance

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
            logger.warning(f"Restaurant manager with id={id} not found.")
            raise RestaurantManagerNotFoundWithIdError(id)

        await uow.managers.delete(id, **kwargs)
        logger.info(f"Deleted restaurant manager with id={id}.")
