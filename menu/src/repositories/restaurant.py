from models import Restaurant
from .generic import SQLAlchemyRepository


class RestaurantRepository(SQLAlchemyRepository[Restaurant]):
    """Repository for Restaurant model operations."""

    model = Restaurant
