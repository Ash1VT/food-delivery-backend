from exceptions import DatabaseInstanceNotFoundError
from models import RestaurantApplication

__all__ = [
    "RestaurantApplicationNotFoundWithIdError",
]


class RestaurantApplicationNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for errors when restaurant application is not found with id.
    """

    def __init__(self, id: int):
        """
        Initialize the RestaurantApplicationNotFoundWithIdError exception.

        Args:
            id (int): The ID of the restaurant application.
        """

        super().__init__('id', id, RestaurantApplication)
