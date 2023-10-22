from models import Restaurant
from .base import DatabaseInstanceNotFoundError, AppError

__all__ = [
    'RestaurantNotFoundWithIdError',
    'RestaurantNotActiveError',
]


class RestaurantNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for restaurant that was not found in the database by id.
    """

    def __init__(self, id: int):
        """
        Initialize the RestaurantNotFoundWithIdError exception.

        Args:
            id (int): The ID of the restaurant.
        """

        super().__init__('id', id, Restaurant)


class RestaurantNotActiveError(AppError):
    """
    Exception class for errors when restaurant is not active.
    """

    def __init__(self, restaurant_id: int):
        """
        Initialize the RestaurantNotActiveError exception.

        Args:
            restaurant_id (int): The ID of the restaurant.
        """

        self._restaurant_id = restaurant_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Restaurant with id={self._restaurant_id} is not active"
