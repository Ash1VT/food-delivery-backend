from dataclasses import asdict
from typing import Optional

from loguru import logger
from sqlalchemy import delete, insert, select, Select, Insert, Delete, func

from db.sqlalchemy.models import MenuItem, Review
from models.menu_item import MenuItemCreateModel, MenuItemModel
from models.rating import RatingModel
from repositories.interfaces.menu_item import IMenuItemRepository
from repositories.sqlalchemy.base import SqlAlchemyRepository
from repositories.sqlalchemy.mappers import to_menu_item_model


class MenuItemRepository(IMenuItemRepository, SqlAlchemyRepository):
    """
    SQLAlchemy implementation of the menu item repository.
    """

    def _get_retrieve_stmt(self, id: int) -> Select:
        """
        Create a SELECT statement to retrieve a menu item by its ID.

        Args:
            id (int): The ID of the menu item to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the menu item.
        """

        return select(MenuItem).where(MenuItem.id == id)

    def _get_retrieve_menu_item_rating_stmt(self, menu_item_id: int) -> Select:
        """
        Create a SELECT statement to retrieve a menu item rating by its ID.

        Args:
            menu_item_id (int): The ID of the menu item to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the menu item rating.
        """

        return select(
            func.count(Review.id).label('reviews_count'),
            func.avg(Review.rating).label('average_rating')
        ).where(Review.menu_item_id == menu_item_id)

    def _get_create_stmt(self, menu_item: MenuItemCreateModel) -> Insert:
        """
        Create an INSERT statement to add a new menu item.

        Args:
            menu_item (MenuItemCreateModel): The dataclass containing the data to add.

        Returns:
            Insert: The INSERT statement to add the new menu item.
        """

        return insert(MenuItem).values(asdict(menu_item)).returning(MenuItem)

    def _get_delete_stmt(self, id: int) -> Delete:
        """
        Create a DELETE statement to remove a menu item by its ID.

        Args:
            id (int): The ID of the menu item to delete.

        Returns:
            Delete: The DELETE statement to remove the menu item.
        """

        return delete(MenuItem).where(MenuItem.id == id)

    async def retrieve(self, id: int) -> Optional[MenuItemModel]:
        stmt = self._get_retrieve_stmt(id)
        result = await self._session.execute(stmt)
        menu_item = result.scalar_one_or_none()

        if menu_item:
            logger.debug(f"Retrieved menu item with id={menu_item.id}")
            return to_menu_item_model(menu_item)

    async def retrieve_menu_item_rating(self, menu_item_id: int) -> Optional[RatingModel]:
        stmt = self._get_retrieve_menu_item_rating_stmt(menu_item_id)
        result = await self._session.execute(stmt)

        result = result.one()

        logger.debug(f"Retrieved menu item rating for menu item with id={menu_item_id}")

        return RatingModel(
            id=menu_item_id,
            rating=result.average_rating,
            review_count=result.reviews_count,
        )

    async def create(self, menu_item: MenuItemCreateModel) -> MenuItemModel:
        stmt = self._get_create_stmt(menu_item)
        result = await self._session.execute(stmt)
        menu_item = result.scalar_one()

        logger.debug(f"Created menu item with id={menu_item.id}")

        return to_menu_item_model(menu_item)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)

        logger.debug(f"Deleted menu item with id={id}")
