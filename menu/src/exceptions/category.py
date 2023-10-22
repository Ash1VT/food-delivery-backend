from models import MenuCategory
from .base import DatabaseInstanceNotFoundError

__all__ = [
    'MenuCategoryNotFoundWithIdError',
]


class MenuCategoryNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, MenuCategory)
