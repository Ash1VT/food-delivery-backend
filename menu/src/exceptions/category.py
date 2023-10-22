from models import MenuCategory
from .base import DatabaseInstanceNotFoundError

__all__ = [
    'MenuCategoryNotFoundWithIdError',
]


class MenuCategoryNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for menu category that was not found in the database by id.
    """

    def __init__(self, id: int):
        """
        Initialize the MenuCategoryNotFoundWithIdError exception.

        Args:
            id (int): The ID of the menu category.
        """

        super().__init__('id', id, MenuCategory)
