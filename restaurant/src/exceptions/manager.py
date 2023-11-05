from models import RestaurantManager, ApplicationType
from .base import AppError, DatabaseInstanceNotFoundError, DatabaseInstanceAlreadyExistsError

__all__ = [
    'RestaurantManagerNotFoundWithIdError',
    'RestaurantManagerOwnershipError',
    'RestaurantManagerNotActiveError',
    'RestaurantManagerAlreadyExistsWithIdError',
    'RestaurantManagerAlreadyHaveApplicationError',
    'RestaurantManagerAlreadyHaveRestaurantError'
]


class RestaurantManagerNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for errors when restaurant manager is not found with id.
    """

    def __init__(self, id: int):
        """
        Initialize the RestaurantManagerNotFoundWithIdError exception.

        Args:
            id (int): The ID of the restaurant manager.
        """

        super().__init__('id', id, RestaurantManager)


class RestaurantManagerAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):
    """
    Exception class for errors when restaurant manager already exists with id.
    """

    def __init__(self, id: int):
        """
        Initialize the RestaurantManagerAlreadyExistsWithIdError exception.

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


class RestaurantManagerNotActiveError(AppError):
    """
    Exception class for permission errors related to restaurant manager not being active.
    """

    def __init__(self, restaurant_manager: RestaurantManager):
        """
        Initialize the RestaurantManagerNotActiveError exception.

        Args:
            restaurant_manager (RestaurantManager): The restaurant manager instance.
        """

        self._restaurant_manager = restaurant_manager
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Manager with id={self._restaurant_manager.id} is not active to perform this actions"


class RestaurantManagerAlreadyHaveApplicationError(AppError):
    """
    Exception class for permission errors related to restaurant manager already having an application.
    """

    def __init__(self, restaurant_manager: RestaurantManager, application_type: ApplicationType):
        """
        Initialize the RestaurantManagerAlreadyHaveApplicationError exception.

        Args:
            restaurant_manager (RestaurantManager): The restaurant manager instance.
            application_type (ApplicationType): The application type.
        """

        self._restaurant_manager = restaurant_manager
        self._application_type = application_type
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Manager with id={self._restaurant_manager.id} already have the {self._application_type.value} " \
               f"application for restaurant"


class RestaurantManagerAlreadyHaveRestaurantError(AppError):
    """
    Exception class for permission errors related to restaurant manager already having a restaurant.
    """

    def __init__(self, restaurant_manager: RestaurantManager):
        """
        Initialize the RestaurantManagerAlreadyHaveRestaurantError exception.

        Args:
            restaurant_manager (RestaurantManager): The restaurant manager instance.
        """

        self._restaurant_manager = restaurant_manager
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Manager with id={self._restaurant_manager.id} already have the " \
               f"Restaurant with id={self._restaurant_manager.restaurant_id}"
