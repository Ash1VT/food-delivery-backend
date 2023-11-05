from typing import Optional, List

from sqlalchemy import Select, select
from sqlalchemy.orm import selectinload

from models import MenuCategory
from .generic import SQLAlchemyRepository

__all__ = [
    'MenuCategoryRepository',
]


class MenuCategoryRepository(SQLAlchemyRepository[MenuCategory]):
    """
    Repository for MenuCategory model operations.
    """

    model = MenuCategory

    def __get_select_stmt_with_options(self,
                                       stmt: Select,
                                       fetch_items: bool = False,
                                       **kwargs) -> Select:
        """
        Modify the SELECT statement to include additional options.

        Args:
            stmt (Select): The base SELECT statement.
            fetch_items (bool, optional): Whether to fetch associated items for category.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The modified SELECT statement with options.
        """

        if fetch_items:
            stmt = stmt.options(selectinload(MenuCategory.items))

        return stmt

    def _get_retrieve_stmt(self,
                           id: int,
                           fetch_items: bool = False,
                           **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a menu category by its ID, with optional additional data.

        Args:
            id (int): The ID of the menu category to retrieve.
            fetch_items (bool, optional): Whether to fetch associated items for the menu category.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the menu category.
        """

        stmt = super()._get_retrieve_stmt(id=id, **kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_items=fetch_items,
                                                   **kwargs)

        return stmt

    def _get_list_stmt(self,
                       fetch_items: bool = False,
                       **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a list of menu categories, with optional additional data.

        Args:
            fetch_items (bool, optional): Whether to fetch associated items for each menu category.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of menu categories.
        """

        stmt = super()._get_list_stmt(**kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_items=fetch_items,
                                                   **kwargs)

        return stmt

    def _get_list_menu_categories_stmt(self,
                                       menu_id: int,
                                       fetch_items: bool = False,
                                       **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a list of menu categories, which belong to a menu
        with optional additional data.

        Args:
            menu_id (int): The ID of the menu.
            fetch_items (bool, optional): Whether to fetch associated items for each menu category.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of menu categories.
        """

        stmt = select(MenuCategory).where(MenuCategory.menu_id == menu_id)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_items=fetch_items,
                                                   **kwargs)

        return stmt

    async def retrieve(self,
                       id: int,
                       fetch_items: bool = False,
                       **kwargs) -> Optional[MenuCategory]:
        """
        Retrieve a menu category by its ID, with optional additional data.

        Args:
            id (int): The ID of the menu category to retrieve.
            fetch_items (bool, optional): Whether to fetch associated items for the menu category. Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[MenuCategory]: The retrieved menu category or None if not found.

        Note:
            When `fetch_items` is True, associated items are fetched for the menu category.
        """

        return await super().retrieve(id=id,
                                      fetch_items=fetch_items,
                                      **kwargs)

    async def list(self,
                   fetch_items: bool = False,
                   **kwargs) -> List[MenuCategory]:
        """
        Retrieve a list of menu categories, with optional additional data.

        Args:
            fetch_items (bool, optional): Whether to fetch associated items for each menu category. Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            List[MenuCategory]: List of menu categories.

        Note:
            When `fetch_items` is True, associated items are fetched for each menu category in the list.
        """

        return await super().list(fetch_items=fetch_items,
                                  **kwargs)

    async def list_menu_categories(self,
                                   menu_id: int,
                                   fetch_items: bool = False,
                                   **kwargs) -> List[MenuCategory]:
        """
        Retrieve a list of menu categories, which belong to a menu with optional additional data.

        Args:
            menu_id (int): The ID of the menu.
            fetch_items (bool, optional): Whether to fetch associated items for each menu category. Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            List[MenuCategory]: List of menu categories.

        Note:
            When `fetch_items` is True, associated items are fetched for each menu category in the list.
        """

        stmt = self._get_list_menu_categories_stmt(menu_id=menu_id,
                                                   fetch_items=fetch_items, **kwargs)

        result = await self._session.execute(stmt)

        return [r[0] for r in result.fetchall()]
