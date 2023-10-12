from exceptions import DatabaseInstanceNotFoundError, DatabaseInstanceAlreadyExistsError
from models import RestaurantApplication

__all__ = [
    "RestaurantApplicationNotFoundWithIdError",
    "RestaurantApplicationAlreadyExistsWithIdError",
]


class RestaurantApplicationNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, RestaurantApplication)


class RestaurantApplicationAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):

    def __init__(self, id: int):
        super().__init__('id', id, RestaurantApplication)
