from models import Restaurant
from .base import DatabaseInstanceNotFoundError, DatabaseInstanceAlreadyExistsError


class RestaurantNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, Restaurant)


class RestaurantAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):

    def __init__(self, id: int):
        super().__init__('id', id, Restaurant)
