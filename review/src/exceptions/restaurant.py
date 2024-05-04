from exceptions.base import DatabaseInstanceNotFoundError


class RestaurantNotFoundError(DatabaseInstanceNotFoundError):

    def __init__(self, restaurant_id: int):
        super().__init__("id", restaurant_id, "Restaurant")
