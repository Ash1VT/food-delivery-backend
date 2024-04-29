from abc import ABC, abstractmethod
from typing import Optional

from models.menu_item import MenuItemModel, MenuItemCreateModel


class IMenuItemRepository(ABC):
    """
    Interface for menu item repository.
    """

    @abstractmethod
    def retrieve(self, id: int) -> Optional[MenuItemModel]:
        """
        Retrieve a menu item by its ID.

        Args:
            id (int): The ID of the menu item to retrieve.

        Returns:
            Optional[MenuItemModel]: The retrieved menu item or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    def create(self, menu_item: MenuItemCreateModel) -> MenuItemModel:
        """
        Create a new menu item and return it.

        Args:
            menu_item (MenuItemCreateModel): The menu item to create.

        Returns:
            MenuItemModel: The created menu item.
        """

        raise NotImplementedError

    @abstractmethod
    def delete(self, id: int) -> None:
        """
        Delete a menu item by its ID.

        Args:
            id (int): The ID of the menu item to delete.
        """

        raise NotImplementedError
