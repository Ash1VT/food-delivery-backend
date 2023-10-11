from models import Restaurant
from .base import AppError, DatabaseInstanceAlreadyExistsError, DatabaseInstanceNotFoundError

__all__ = [
    'RestaurantNotFoundWithIdError',
    'RestaurantAlreadyExistsWithIdError',
    'RestaurantNotActiveError'
]


class RestaurantNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, Restaurant)


class RestaurantAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):

    def __init__(self, id: int):
        super().__init__('id', id, Restaurant)


class RestaurantNotActiveError(AppError):

    def __init__(self, restaurant: Restaurant):
        self._restaurant = restaurant
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Restaurant with id={self._restaurant.id} is not active to perform this actions"
