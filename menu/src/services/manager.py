from src.models import RestaurantManager
from src.schemas import RestaurantManagerCreateIn, RestaurantManagerCreateOut
from src.uow import SqlAlchemyUnitOfWork
from .mixins import CreateMixin, DeleteMixin


class RestaurantManagerService(CreateMixin[RestaurantManager, RestaurantManagerCreateIn, RestaurantManagerCreateOut],
                               DeleteMixin[RestaurantManager]):
    """
    Service class for managing restaurant managers.

    This class provides methods for creating and deleting restaurant manager instances.

    Attributes:
        schema_create_out (RestaurantManagerCreateOut): The schema for output representation of created instances.
    """

    schema_create_out = RestaurantManagerCreateOut

    async def create_instance(self, item: RestaurantManagerCreateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantManager:
        """
        Create a new restaurant manager instance in the repository.

        Args:
            item (RestaurantManagerCreateIn): The data to create the restaurant manager.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantManager: The created restaurant manager instance.
        """

        data = item.model_dump()

        return await uow.managers.create(data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a restaurant manager instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant manager to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        await uow.managers.delete(id, **kwargs)
