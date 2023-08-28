from src.models import MenuCategory
from .base import DatabaseInstanceNotFoundError


class MenuCategoryNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, MenuCategory)
