from models import RestaurantManager

from .generic import SQLAlchemyRepository


class RestaurantManagerRepository(SQLAlchemyRepository[RestaurantManager]):
    """Repository for RestaurantManager model operations."""

    model = RestaurantManager
