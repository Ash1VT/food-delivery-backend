from dataclasses import asdict
from typing import Optional

from sqlalchemy import delete, insert, select, Select, Insert, Delete

from db.sqlalchemy.models import MenuItem
from models.menu_item import MenuItemCreateModel, MenuItemModel
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
            return to_menu_item_model(menu_item)

    async def create(self, menu_item: MenuItemCreateModel) -> MenuItemModel:
        stmt = self._get_create_stmt(menu_item)
        result = await self._session.execute(stmt)
        menu_item = result.scalar_one()
        return to_menu_item_model(menu_item)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)
