from models import MenuItem
from .base import AppError, DatabaseInstanceNotFoundError

__all__ = [
    'MenuItemNotFoundWithIdError',
    'MenuItemAlreadyInCategoryError',
    'MenuItemNotInCategoryError',
]


class MenuItemNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for menu item that was not found in the database by id.
    """

    def __init__(self, id: int):
        """
        Initialize the MenuItemNotFoundWithIdError exception.

        Args:
            id (int): The ID of the menu item.
        """

        super().__init__('id', id, MenuItem)


class MenuItemAlreadyInCategoryError(AppError):
    """
    Exception class for menu item that is already in a menu category
    """

    def __init__(self, category_id: int):
        """
        Initialize the MenuItemAlreadyInCategoryError exception.

        Args:
            category_id (int): The ID of the menu category.
        """

        self._category_id = category_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 400

    @property
    def message(self) -> str:
        return f"MenuItem is already in Category with id={self._category_id}"


class MenuItemNotInCategoryError(AppError):
    """
    Exception class for menu item that is not in a menu category
    """

    def __init__(self, category_id: int):
        """
        Initialize the MenuItemNotInCategoryError exception.

        Args:
            category_id (int): The ID of the menu category.
        """

        self._category_id = category_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 400

    @property
    def message(self) -> str:
        return f"MenuItem is not found in Category with id={self._category_id}"
