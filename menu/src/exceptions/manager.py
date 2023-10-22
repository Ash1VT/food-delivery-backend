from models import RestaurantManager
from .base import AppError, DatabaseInstanceNotFoundError

__all__ = [
    'RestaurantManagerNotFoundWithIdError',
    'RestaurantManagerOwnershipError',
]


class RestaurantManagerNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for restaurant manager that was not found in the database by id.
    """

    def __init__(self, id: int):
        """
        Initialize the RestaurantManagerNotFoundWithIdError exception.

        Args:
            id (int): The ID of the restaurant manager.
        """

        super().__init__('id', id, RestaurantManager)


class RestaurantManagerOwnershipError(AppError):
    """
    Exception class for permission errors related to restaurant manager ownership.
    """

    def __init__(self, restaurant_manager: RestaurantManager, restaurant_id: int):
        """
        Initialize the RestaurantManagerOwnershipError exception.

        Args:
            restaurant_manager (RestaurantManager): The restaurant manager instance.
            restaurant_id (int): The ID of the restaurant.
        """

        self._restaurant_manager = restaurant_manager
        self._restaurant_id = restaurant_id
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Manager with id={self._restaurant_manager.id}" \
               f" must own Restaurant with id={self._restaurant_id}" \
               f" to perform this operation"
