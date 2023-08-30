from models import RestaurantManager
from .base import AppError, DatabaseInstanceNotFoundError


class RestaurantManagerNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, RestaurantManager)


class RestaurantManagerOwnershipError(AppError):
    """
    Exception class for permission errors related to restaurant manager ownership.
    """

    def __init__(self, restaurant_manager: RestaurantManager, restaurant_id: int):
        """
        Initialize the RestaurantManagerOwnershipError exception.

        Args:
            restaurant_manager_id (int): The ID of the restaurant manager.
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
               f" does not own Restaurant with id={self._restaurant_id}" \
               f" to perform write operations connected with it"


class RestaurantManagerNotActiveError(AppError):

    def __init__(self, restaurant_manager: RestaurantManager):
        self._restaurant_manager = restaurant_manager
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Restaurant with id={self._restaurant_manager.restaurant_id} is not activated yet"
