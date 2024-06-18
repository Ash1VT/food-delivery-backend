from typing import Optional, List

from loguru import logger
from sqlalchemy import Select, select, desc
from sqlalchemy.orm import selectinload

from models import Restaurant
from models.pagination import PaginatedModel
from utils.paginate import paginate
from .generic import SQLAlchemyRepository

__all__ = [
    "RestaurantRepository",
]


class RestaurantRepository(SQLAlchemyRepository[Restaurant]):
    """
    Repository for Restaurant model operations.
    """

    model = Restaurant

    def __get_select_stmt_with_options(self,
                                       stmt: Select,
                                       fetch_working_hours: bool = False,
                                       **kwargs) -> Select:
        """Modify the SELECT statement to include additional options.

        Args:
            stmt (Select): The base SELECT statement.
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The modified SELECT statement with options.
        """

        if fetch_working_hours:
            stmt = stmt.options(
                selectinload(Restaurant.working_hours)
            )

        return stmt

    def _get_retrieve_stmt(self,
                           id: int,
                           fetch_working_hours: bool = False,
                           **kwargs) -> Select:
        """Create a SELECT statement to retrieve a menu by its ID, with optional additional data.

        Args:
            id (int): The ID of the menu to retrieve.
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the menu.
        """

        stmt = super()._get_retrieve_stmt(id=id, **kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_working_hours=fetch_working_hours,
                                                   **kwargs)

        return stmt

    def _get_list_stmt(self,
                       fetch_working_hours: bool = False,
                       **kwargs) -> Select:
        """Create a SELECT statement to retrieve a list of menus, with optional additional data.

        Args:
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of menus.
        """

        stmt = super()._get_list_stmt(**kwargs)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_working_hours=fetch_working_hours,
                                                   **kwargs)
        if kwargs.get('address', None):
            stmt = stmt.filter(Restaurant.address.contains(kwargs['address']))

        if kwargs.get('name', None):
            stmt = stmt.filter(Restaurant.name.contains(kwargs['name']))

        if kwargs.get('order_by_rating', None):
            stmt = stmt.order_by(desc(kwargs['order_by_rating']))

        return stmt

    def _get_list_active_restaurants_stmt(self,
                                          fetch_working_hours: bool = False,
                                          **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve a list of active restaurants, with optional additional data.

        Args:
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of active Restaurants.
        """

        stmt = select(Restaurant).where(Restaurant.is_active)

        stmt = self.__get_select_stmt_with_options(stmt=stmt,
                                                   fetch_working_hours=fetch_working_hours,
                                                   **kwargs)

        if kwargs.get('address', None):
            stmt = stmt.filter(Restaurant.address.contains(kwargs['address']))

        if kwargs.get('name', None):
            stmt = stmt.filter(Restaurant.name.contains(kwargs['name']))

        if kwargs.get('order_by_rating', None):
            stmt = stmt.order_by(desc(Restaurant.rating))

        return stmt

    async def retrieve(self,
                       id: int,
                       fetch_working_hours: bool = False,
                       **kwargs) -> Optional[Restaurant]:
        """Retrieve a menu by its ID, with optional additional data.

        Args:
            id (int): The ID of the menu to retrieve.
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Menu]: The retrieved menu or None if not found.

        Note:
            When `fetch_working_hours` is True, associated working hours are fetched for the restaurant.
        """

        return await super().retrieve(id=id,
                                      fetch_working_hours=fetch_working_hours,
                                      **kwargs)

    async def list(self,
                   fetch_working_hours: bool = False,
                   limit: int = 100,
                   offset: int = 0,
                   **kwargs) -> PaginatedModel[Restaurant]:
        """Retrieve a list of restaurants, with optional additional data.

        Args:
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            limit (Optional[int]): The maximum number of restaurants to retrieve. Default is 100.
            offset (Optional[int]): The offset to start retrieving restaurants from. Default is 0.
            **kwargs: Additional keyword arguments.

        Returns:
            PaginatedModel[Restaurant]: List of restaurants.

        Note:
            When `fetch_working_hours` is True, associated working hours are fetched for each restaurant in the list.
        """

        stmt = self._get_list_stmt(fetch_working_hours=fetch_working_hours, **kwargs)
        result = await paginate(stmt, self._session, limit=limit, offset=offset)

        logger.debug(f"Retrieved list of {self.model.__name__}")

        return PaginatedModel(limit=limit, offset=offset, count=result['count'], items=result['items'])

    async def list_active_restaurants(self,
                                      fetch_working_hours: bool = False,
                                      limit: int = 100, offset: int = 0, **kwargs) -> PaginatedModel[Restaurant]:
        """
        Retrieve a list of active Restaurants, with optional additional data.

        Args:
            fetch_working_hours (bool, optional): Whether to fetch associated working hours for restaurant.
                Default is False.
            limit (Optional[int]): The maximum number of restaurants to retrieve. Default is 100.
            offset (Optional[int]): The offset to start retrieving restaurants from. Default is 0.
            **kwargs: Additional keyword arguments.

        Returns:
            PaginatedModel[Restaurant]: List of active Restaurants.
        """

        stmt = self._get_list_active_restaurants_stmt(fetch_working_hours=fetch_working_hours, **kwargs)
        result = await paginate(stmt, self._session, limit=limit, offset=offset)

        logger.debug(f"Retrieved list of active restaurants")

        return PaginatedModel(limit=limit, offset=offset, count=result['count'], items=result['items'])
