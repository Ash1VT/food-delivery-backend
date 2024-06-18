from exceptions.base import DatabaseInstanceNotFoundError


class OrderNotFoundError(DatabaseInstanceNotFoundError):

    def __init__(self, order_id: int):
        super().__init__("id", order_id, "Order")
