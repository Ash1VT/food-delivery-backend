from abc import ABC
from dataclasses import dataclass


@dataclass
class OrderBaseModel(ABC):
    """
    Base model for an order.
    """

    id: int
    customer_id: int
    courier_id: int


@dataclass
class OrderModel(OrderBaseModel):
    """
    Model for an order.
    """

    pass


@dataclass
class OrderCreateModel(OrderBaseModel):
    """
    Model for creating an order.
    """

    pass
