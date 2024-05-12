from typing import List

from sqlalchemy import Select, select
from loguru import logger

from models import MenuItem
from .generic import SQLAlchemyRepository

__all__ = [
    'MenuItemRepository',
]


class MenuItemRepository(SQLAlchemyRepository[MenuItem]):
    """
    Repository for MenuItem model operations.
    """

    model = MenuItem

    def _get_list_restaurant_items_stmt(self,
                                        restaurant_id: int,
                                        **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a list of menu items, which belong to restaurant
        with optional additional data.

        Args:
            restaurant_id (int): The ID of the restaurant.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of menu items.
        """

        stmt = select(MenuItem).where(MenuItem.restaurant_id == restaurant_id)

        return stmt

    async def list_restaurant_items(self,
                                    restaurant_id: int,
                                    **kwargs) -> List[MenuItem]:
        """
        Retrieve a list of menu items, which belong to restaurant with optional additional data.

        Args:
            restaurant_id (int): The ID of the restaurant.
            **kwargs: Additional keyword arguments.

        Returns:
            List[MenuItem]: List of menu items.
        """

        stmt = self._get_list_restaurant_items_stmt(restaurant_id=restaurant_id, **kwargs)

        result = await self._session.execute(stmt)

        result = [r[0] for r in result.fetchall()]

        logger.debug(f"Retrieved list of MenuItem for restaurant with id={restaurant_id}")

        return result
