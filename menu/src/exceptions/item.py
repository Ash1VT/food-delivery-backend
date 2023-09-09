from models import MenuItem
from .base import AppError, DatabaseInstanceNotFoundError


class MenuItemNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, MenuItem)


class MenuItemAlreadyInCategoryError(AppError):

    def __init__(self, category_id: int):
        self._category_id = category_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 400

    @property
    def message(self) -> str:
        return f"MenuItem is already in Category with id={self._category_id}"


class MenuItemNotInCategoryError(AppError):

    def __init__(self, category_id: int):
        self._category_id = category_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 400

    @property
    def message(self) -> str:
        return f"MenuItem is not found in Category with id={self._category_id}"
