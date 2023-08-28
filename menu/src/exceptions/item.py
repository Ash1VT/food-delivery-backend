from models import MenuItem
from .base import DatabaseInstanceNotFoundError


class MenuItemNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, MenuItem)
