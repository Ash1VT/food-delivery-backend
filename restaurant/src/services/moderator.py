from loguru import logger

from models import Moderator
from schemas.moderator import ModeratorRetrieveOut, ModeratorCreateIn, ModeratorCreateOut
from uow import SqlAlchemyUnitOfWork
from exceptions import ModeratorNotFoundWithIdError, ModeratorAlreadyExistsWithIdError

from .mixins import RetrieveMixin, CreateMixin, DeleteMixin, UpdateMixin

__all__ = [
    "ModeratorService",
]


class ModeratorService(RetrieveMixin[Moderator, ModeratorRetrieveOut],
                       CreateMixin[Moderator, ModeratorCreateIn, ModeratorCreateOut],
                       DeleteMixin[Moderator]):
    """
    Service class for managing moderators.

    This class provides methods for creating and deleting moderator instances.

    Attributes:
        schema_retrieve_out (ModeratorRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (ModeratorCreateOut): The schema for output representation of created instances.
    """

    schema_retrieve_out = ModeratorRetrieveOut
    schema_create_out = ModeratorCreateOut

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> Moderator:
        """
        Retrieve a moderator instance by its ID from the repository.

        Args:
            id (int): The ID of the moderator to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Moderator: The retrieved moderator instance.

        Raises:
            ModeratorNotFoundWithIdError: If the moderator with the given ID is not found.
        """

        retrieved_instance = await uow.moderators.retrieve(id, **kwargs)

        if not retrieved_instance:
            logger.warning(f"Moderator with id={id} not found")
            raise ModeratorNotFoundWithIdError(id)

        logger.info(f"Retrieved Moderator with id={id}.")
        return retrieved_instance

    async def create_instance(self, item: ModeratorCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Moderator:
        """
        Create a new moderator instance in the repository.

        Args:
            item (ModeratorCreateIn): The data to create the moderator.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Moderator: The created moderator instance.

        Raises:
            ModeratorAlreadyExistsWithIdError: If the moderator with the given ID already exists.
        """

        if await uow.moderators.exists(item.id):
            logger.warning(f"Moderator with id={item.id} already exists")
            raise ModeratorAlreadyExistsWithIdError(item.id)

        data = item.model_dump()

        created_instance = await uow.moderators.create(data, **kwargs)

        logger.info(f"Created moderator with id={created_instance.id}.")

        return created_instance

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a moderator instance by its ID from the repository.

        Args:
            id (int): The ID of the moderator to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            ModeratorNotFoundWithIdError: If the moderator with the given ID is not found.
        """

        if not await uow.moderators.exists(id):
            logger.warning(f"Moderator with id={id} not found")
            raise ModeratorNotFoundWithIdError(id)

        await uow.moderators.delete(id, **kwargs)
        logger.info(f"Deleted moderator with id={id}.")
