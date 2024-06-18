from abc import ABC
from dataclasses import dataclass


@dataclass
class RestaurantBaseModel(ABC):
    """
    Base model for a restaurant.
    """

    is_active: bool


@dataclass
class RestaurantModel(RestaurantBaseModel):
    """
    Model for a restaurant.
    """

    id: int


@dataclass
class RestaurantCreateModel(RestaurantBaseModel):
    """
    Model for creating a restaurant.
    """

    id: int


@dataclass
class RestaurantUpdateModel(RestaurantBaseModel):
    """
    Model for updating restaurant.
    """
    pass
