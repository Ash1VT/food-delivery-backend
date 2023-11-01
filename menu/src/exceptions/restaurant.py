from models import Restaurant
from .base import DatabaseInstanceNotFoundError, DatabaseInstanceAlreadyExistsError, AppError

__all__ = [
    'RestaurantNotFoundWithIdError',
    'RestaurantAlreadyExistsWithIdError',
    'RestaurantNotActiveError',
    'RestaurantMissingCurrentMenuError'
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


class RestaurantAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):
    """
    Exception class for restaurant that already exists in the database by id.
    """

    def __init__(self, id: int):
        """
        Initialize the RestaurantAlreadyExistsWithIdError exception.

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


class RestaurantMissingCurrentMenuError(AppError):
    """
    Exception class for when current menu is missing.
    """

    def __init__(self, restaurant_id: int):
        """
        Initialize the CurrentMenuMissingError exception.

        Args:
            restaurant_id (int): The ID of the restaurant.
        """

        self._restaurant_id = restaurant_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 404

    @property
    def message(self) -> str:
        return f"Restaurant with id={self._restaurant_id} hasn't got current menu"
