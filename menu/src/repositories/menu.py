from typing import Optional, List

from sqlalchemy import Select
from sqlalchemy.orm import selectinload

from models import Menu, MenuCategory
from .generic import SQLAlchemyRepository


class MenuRepository(SQLAlchemyRepository[Menu]):
    """Repository for Menu model operations."""

    model = Menu

    def __get_select_stmt_with_options(self,
                                       stmt: Select,
                                       fetch_categories: bool = False,
                                       **kwargs) -> Select:
        """Modify the SELECT statement to include additional options.

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
        """Create a SELECT statement to retrieve a menu by its ID, with optional additional data.

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
        """Create a SELECT statement to retrieve a list of menus, with optional additional data.

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

    async def retrieve(self,
                       id: int,
                       fetch_categories: bool = False,
                       **kwargs) -> Optional[Menu]:
        """Retrieve a menu by its ID, with optional additional data.

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
        """Retrieve a list of menus, with optional additional data.

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
