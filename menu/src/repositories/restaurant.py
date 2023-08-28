from typing import Optional, List

from sqlalchemy import Select
from sqlalchemy.orm import selectinload

from models import Restaurant, Menu, MenuCategory
from .generic import SQLAlchemyRepository


class RestaurantRepository(SQLAlchemyRepository[Restaurant]):
    """Repository for Restaurant model operations."""

    model = Restaurant

    def __get_select_stmt_with_options(self,
                                       stmt: Select,
                                       fetch_menus: bool = False,
                                       fetch_current_menu: bool = False,
                                       **kwargs) -> Select:
        """Modify the SELECT statement to include additional options.

        Args:
            stmt (Select): The base SELECT statement.
            fetch_menus (bool, optional): Whether to fetch associated menus for restaurant.
                Default is False.
            fetch_current_menu (bool, optional): Whether to fetch associated current menu for restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The modified SELECT statement with options.
        """

        if fetch_menus:
            stmt = stmt.options(
                selectinload(Restaurant.menus)
                .selectinload(Menu.categories)
                .selectinload(MenuCategory.items))

        if fetch_current_menu:
            stmt = stmt.options(
                selectinload(Restaurant.current_menu)
                .selectinload(Menu.categories)
                .selectinload(MenuCategory.items))

        return stmt

    def _get_retrieve_stmt(self,
                           id: int,
                           fetch_menus: bool = False,
                           fetch_current_menu: bool = False,
                           **kwargs) -> Select:
        """Create a SELECT statement to retrieve a restaurant by its ID, with optional additional data.

        Args:
            id (int): The ID of the restaurant to retrieve.
            fetch_menus (bool, optional): Whether to fetch associated menus. Default is False.
            fetch_current_menu (bool, optional): Whether to fetch the current menu for the restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the restaurant.
        """

        stmt = super()._get_retrieve_stmt(id=id, **kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_menus=fetch_menus,
                                                   fetch_current_menu=fetch_current_menu,
                                                   **kwargs)

        return stmt

    def _get_list_stmt(self,
                       fetch_menus: bool = False,
                       fetch_current_menu: bool = False,
                       **kwargs) -> Select:
        """Create a SELECT statement to retrieve a list of restaurants, with optional additional data.

        Args:
            fetch_menus (bool, optional): Whether to fetch associated menus for each restaurant.
                Default is False.
            fetch_current_menu (bool, optional): Whether to fetch the current menu for each restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of restaurants.
        """

        stmt = super()._get_list_stmt(**kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_menus=fetch_menus,
                                                   fetch_current_menu=fetch_current_menu,
                                                   **kwargs)

        return stmt

    async def retrieve(self,
                       id: int,
                       fetch_menus: bool = False,
                       fetch_current_menu: bool = False,
                       **kwargs) -> Optional[Restaurant]:
        """Retrieve a restaurant by its ID, with optional additional data.

        Args:
            id (int): The ID of the restaurant to retrieve.
            fetch_menus (bool, optional): Whether to fetch associated menus. Default is False.
            fetch_current_menu (bool, optional): Whether to fetch the current menu for the restaurant. Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Restaurant]: The retrieved restaurant or None if not found.

        Note:
            When `fetch_menus` is True, associated menus are fetched along with their categories and items.
            When `fetch_current_menu` is True, the current menu is fetched with its categories and items.
        """

        return await super().retrieve(id=id,
                                      fetch_menus=fetch_menus,
                                      fetch_current_menu=fetch_current_menu,
                                      **kwargs)

    async def list(self,
                   fetch_menus: bool = False,
                   fetch_current_menu: bool = False,
                   **kwargs) -> List[Restaurant]:
        """Retrieve a list of restaurants, with optional additional data.

        Args:
            fetch_menus (bool, optional): Whether to fetch associated menus for each restaurant. Default is False.
            fetch_current_menu (bool, optional): Whether to fetch the current menu for each restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            List[Restaurant]: List of restaurants.

        Note:
            When `fetch_menus` is True, associated menus are fetched along with their categories and items
            for each restaurant in the list.
            When `fetch_current_menu` is True, the current menu is fetched with its categories and items
            for each restaurant in the list.
        """

        return await super().list(fetch_menus=fetch_menus,
                                  fetch_current_menu=fetch_current_menu,
                                  **kwargs)
