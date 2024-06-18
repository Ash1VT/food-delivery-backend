from typing import Optional, List

from sqlalchemy import select, Select
from sqlalchemy.orm import selectinload
from loguru import logger

from models import Menu, MenuCategory, Restaurant
from .generic import SQLAlchemyRepository

__all__ = [
    'MenuRepository',
]


class MenuRepository(SQLAlchemyRepository[Menu]):
    """
    Repository for Menu model operations.
    """

    model = Menu

    def __get_select_stmt_with_options(self,
                                       stmt: Select,
                                       fetch_categories: bool = False,
                                       **kwargs) -> Select:
        """
        Modify the SELECT statement to include additional options.

        Args:
            stmt (Select): The base SELECT statement.
            fetch_categories (bool, optional): Whether to fetch associated categories for menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The modified SELECT statement with options.
        """

        if fetch_categories:
            stmt = stmt.options(
                selectinload(Menu.categories)
                .selectinload(MenuCategory.items)
            )

        return stmt

    def _get_retrieve_stmt(self,
                           id: int,
                           fetch_categories: bool = False,
                           **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a menu by its ID, with optional additional data.

        Args:
            id (int): The ID of the menu to retrieve.
            fetch_categories (bool, optional): Whether to fetch associated categories for the menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the menu.
        """

        stmt = super()._get_retrieve_stmt(id=id, **kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_categories=fetch_categories,
                                                   **kwargs)

        return stmt

    def _get_list_stmt(self,
                       fetch_categories: bool = False,
                       **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a list of menus, with optional additional data.

        Args:
            fetch_categories (bool, optional): Whether to fetch associated categories for each menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of menus.
        """

        stmt = super()._get_list_stmt(**kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_categories=fetch_categories,
                                                   **kwargs)

        return stmt

    def _get_retrieve_current_restaurant_menu_stmt(self,
                                                   restaurant_id: int,
                                                   fetch_categories: bool = False,
                                                   **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a current menu of restaurant by its ID,
        with optional additional data.

        Args:
            restaurant_id (int): The ID of the restaurant.
            fetch_categories (bool, optional): Whether to fetch associated categories for the menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the menu.
        """

        stmt = select(Menu).join(Restaurant, Restaurant.current_menu_id == Menu.id).where(
            Restaurant.id == restaurant_id)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_categories=fetch_categories,
                                                   **kwargs)

        return stmt

    def _get_list_restaurant_menus_stmt(self,
                                        restaurant_id: int,
                                        fetch_categories: bool = False,
                                        **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a list of menus, which belong to restaurant
        with optional additional data.

        Args:
            restaurant_id (int): The ID of the restaurant.
            fetch_categories (bool, optional): Whether to fetch associated categories for each menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of menus.
        """

        stmt = select(Menu).where(Menu.restaurant_id == restaurant_id)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_categories=fetch_categories,
                                                   **kwargs)

        return stmt

    async def retrieve(self,
                       id: int,
                       fetch_categories: bool = False,
                       **kwargs) -> Optional[Menu]:
        """
        Retrieve a menu by its ID, with optional additional data.

        Args:
            id (int): The ID of the menu to retrieve.
            fetch_categories (bool, optional): Whether to fetch associated categories for the menu. Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Menu]: The retrieved menu or None if not found.

        Note:
            When `fetch_categories` is True, associated categories are fetched along with their items for the menu.
        """

        return await super().retrieve(id=id,
                                      fetch_categories=fetch_categories,
                                      **kwargs)

    async def list(self,
                   fetch_categories: bool = False,
                   **kwargs) -> List[Menu]:
        """
        Retrieve a list of menus, with optional additional data.

        Args:
            fetch_categories (bool, optional): Whether to fetch associated categories for each menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            List[Menu]: List of menus.

        Note:
            When `fetch_categories` is True, associated categories are fetched along with their items
            for each menu in the list.
        """

        return await super().list(fetch_categories=fetch_categories,
                                  **kwargs)

    async def retrieve_current_restaurant_menu(self,
                                               restaurant_id: int,
                                               fetch_categories: bool = False,
                                               **kwargs) -> Optional[Menu]:
        """
        Retrieve a current menu of restaurant by its ID, with optional additional data.

        Args:
            restaurant_id (int): The ID of the restaurant.
            fetch_categories (bool, optional): Whether to fetch associated categories for the menu. Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Menu]: The retrieved menu or None if not found.

        Note:
            When `fetch_categories` is True, associated categories are fetched along with their items for the menu.
        """

        stmt = self._get_retrieve_current_restaurant_menu_stmt(restaurant_id=restaurant_id,
                                                               fetch_categories=fetch_categories,
                                                               **kwargs)

        result = await self._session.execute(stmt)

        result = result.scalar_one_or_none()

        if result:
            logger.debug(f"Retrieved current restaurant Menu with id={result.id} for Restaurant with id={restaurant_id}")
            return result

        logger.warning(f"Requested {self.model.__name__} for Restaurant with id={restaurant_id} but it not found")

    async def list_restaurant_menus(self,
                                    restaurant_id: int,
                                    fetch_categories: bool = False,
                                    **kwargs) -> List[Menu]:
        """
        Retrieve a list of menus, which belong to restaurant with optional additional data.

        Args:
            restaurant_id (int): The ID of the restaurant.
            fetch_categories (bool, optional): Whether to fetch associated categories for each menu.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            List[Menu]: List of menus.

        Note:
            When `fetch_categories` is True, associated categories are fetched along with their items
            for each menu in the list.
        """

        stmt = self._get_list_restaurant_menus_stmt(restaurant_id=restaurant_id,
                                                    fetch_categories=fetch_categories, **kwargs)

        result = await self._session.execute(stmt)

        result = [r[0] for r in result.fetchall()]

        logger.debug(f"Retrieved list of Menu for Restaurant with id={restaurant_id}")

        return result
