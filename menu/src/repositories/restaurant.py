from typing import Optional

from sqlalchemy import Select, select

from models import Restaurant, MenuCategory, Menu
from .generic import SQLAlchemyRepository

__all__ = [
    'RestaurantRepository',
]


class RestaurantRepository(SQLAlchemyRepository[Restaurant]):
    """
    Repository for Restaurant model operations.
    """

    model = Restaurant

    def _get_retrieve_by_category_stmt(self, category_id: int, **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a restaurant, which belongs to
            provided menu category with optional additional data.

        Args:
            category_id (int): The ID of the menu category.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the restaurant.
        """

        return select(Restaurant) \
            .join(Menu, Menu.restaurant_id == Restaurant.id) \
            .join(MenuCategory, MenuCategory.menu_id == Menu.id) \
            .where(MenuCategory.id == category_id)

    def _get_retrieve_by_menu_stmt(self, menu_id: int, **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a restaurant, which belongs to
            provided menu with optional additional data.

        Args:
            menu_id (int): The ID of the menu.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the restaurant.
        """

        return select(Restaurant) \
            .join(Menu, Menu.restaurant_id == Restaurant.id) \
            .where(Menu.id == menu_id)

    async def retrieve_by_category(self, category_id: int, **kwargs) -> Optional[Restaurant]:
        """
        Retrieve a restaurant, which belongs to provided menu category with optional additional data.

        Args:
            category_id (int): The ID of the menu category.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Restaurant]: The restaurant or None if not found.
        """

        stmt = self._get_retrieve_by_category_stmt(category_id=category_id, **kwargs)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()

    async def retrieve_by_menu(self, menu_id: int, **kwargs) -> Optional[Restaurant]:
        """
        Retrieve a restaurant, which belongs to provided menu with optional additional data.

        Args:
            menu_id (int): The ID of the menu.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Restaurant]: The restaurant or None if not found.
        """

        stmt = self._get_retrieve_by_menu_stmt(menu_id=menu_id, **kwargs)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()
