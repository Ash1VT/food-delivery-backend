from models import RestaurantApplication

from .generic import SQLAlchemyRepository

__all__ = ["RestaurantApplicationRepository"]


class RestaurantApplicationRepository(SQLAlchemyRepository[RestaurantApplication]):
    """Repository for RestaurantApplication model operations."""

    model = RestaurantApplication
