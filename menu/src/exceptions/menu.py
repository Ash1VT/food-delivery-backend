from models import Menu
from .base import AppError, DatabaseInstanceNotFoundError

__all__ = [
    'MenuNotFoundWithIdError',
    'CurrentMenuMissingError',
]


class MenuNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, Menu)


class CurrentMenuMissingError(AppError):

    def __init__(self, restaurant_id: int):
        self._restaurant_id = restaurant_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 404

    @property
    def message(self) -> str:
        return f"Restaurant with id={self._restaurant_id} hasn't got current menu"
