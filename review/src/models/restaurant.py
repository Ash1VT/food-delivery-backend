from abc import ABC
from dataclasses import dataclass


@dataclass
class RestaurantBaseModel(ABC):
    """
    Base model for a restaurant.
    """

    id: int


@dataclass
class RestaurantModel(RestaurantBaseModel):
    """
    Model for a restaurant.
    """

    pass


@dataclass
class RestaurantCreateModel(RestaurantBaseModel):
    """
    Model for creating a restaurant.
    """

    pass
