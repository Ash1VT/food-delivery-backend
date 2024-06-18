from abc import ABC
from dataclasses import dataclass


@dataclass
class CourierBaseModel(ABC):
    """
    Base model for courier.
    """

    id: int


@dataclass
class CourierModel(CourierBaseModel):
    """
    Model for courier.
    """

    pass


@dataclass
class CourierCreateModel(CourierBaseModel):
    """
    Model for creating a courier.
    """

    pass
