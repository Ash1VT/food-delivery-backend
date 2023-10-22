from models import RestaurantManager

from .generic import SQLAlchemyRepository

__all__ = [
    'RestaurantManagerRepository',
]


class RestaurantManagerRepository(SQLAlchemyRepository[RestaurantManager]):
    """
    Repository for RestaurantManager model operations.
    """

    model = RestaurantManager
