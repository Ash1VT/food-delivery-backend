from dataclasses import asdict
from typing import Optional

from sqlalchemy import insert, select, delete, Delete, Insert, Select

from db.sqlalchemy.models import Restaurant
from models.restaurant import RestaurantCreateModel, RestaurantModel
from repositories.interfaces.restaurant import IRestaurantRepository
from repositories.sqlalchemy.base import SqlAlchemyRepository
from repositories.sqlalchemy.mappers import to_restaurant_model


class RestaurantRepository(IRestaurantRepository, SqlAlchemyRepository):
    """
    SQLAlchemy implementation of restaurant repository.
    """

    def _get_retrieve_stmt(self, id: int) -> Select:
        """
        Create a SELECT statement to retrieve a restaurant by its ID.

        Args:
            id (int): The ID of the restaurant to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the restaurant.
        """

        return select(Restaurant).where(Restaurant.id == id)

    def _get_create_stmt(self, restaurant: RestaurantCreateModel) -> Insert:
        """
        Create an INSERT statement to add a new restaurant.

        Args:
            restaurant (RestaurantCreateModel): The dataclass containing the data to add.

        Returns:
            Insert: The INSERT statement to add the new menu item.
        """

        return insert(Restaurant).values(asdict(restaurant)).returning(Restaurant)

    def _get_delete_stmt(self, id: int) -> Delete:
        """
        Create a DELETE statement to remove a restaurant by its ID.

        Args:
            id (int): The ID of the restaurant to delete.

        Returns:
            Delete: The DELETE statement to remove the restaurant.
        """

        return delete(Restaurant).where(Restaurant.id == id)

    async def retrieve(self, id: int) -> Optional[RestaurantModel]:
        stmt = self._get_retrieve_stmt(id)
        result = await self._session.execute(stmt)
        restaurant = result.scalar_one_or_none()
        if restaurant:
            return to_restaurant_model(restaurant)

    async def create(self, restaurant: RestaurantCreateModel) -> RestaurantModel:
        stmt = self._get_create_stmt(restaurant)
        result = await self._session.execute(stmt)
        restaurant = result.scalar_one()
        return to_restaurant_model(restaurant)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)
