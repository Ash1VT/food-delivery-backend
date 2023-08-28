from src.models import MenuItem
from .generic import SQLAlchemyRepository


class MenuItemRepository(SQLAlchemyRepository[MenuItem]):
    """Repository for MenuItem model operations."""

    model = MenuItem
