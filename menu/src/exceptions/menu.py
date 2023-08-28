from models import Menu
from .base import DatabaseInstanceNotFoundError


class MenuNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, Menu)
