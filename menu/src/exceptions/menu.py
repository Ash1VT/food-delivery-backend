from models import Menu
from .base import DatabaseInstanceNotFoundError

__all__ = [
    'MenuNotFoundWithIdError',
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
