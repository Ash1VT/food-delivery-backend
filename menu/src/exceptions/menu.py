from models import Menu
from .base import AppError, DatabaseInstanceNotFoundError

__all__ = [
    'MenuNotFoundWithIdError',
    'CurrentMenuMissingError',
]


class MenuNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for menu that was not found in the database by id.
    """

    def __init__(self, id: int):
        """
        Initialize the MenuNotFoundWithIdError exception.

        Args:
            id (int): The ID of the menu.
        """

        super().__init__('id', id, Menu)


class CurrentMenuMissingError(AppError):
    """
    Exception class for when current menu is missing.
    """

    def __init__(self, restaurant_id: int):
        """
        Initialize the CurrentMenuMissingError exception.

        Args:
            restaurant_id (int): The ID of the restaurant.
        """

        self._restaurant_id = restaurant_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 404

    @property
    def message(self) -> str:
        return f"Restaurant with id={self._restaurant_id} hasn't got current menu"
