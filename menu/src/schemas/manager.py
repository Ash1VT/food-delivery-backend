from abc import ABC
from typing import Optional, List

from pydantic import BaseModel, Field


# Base

class RestaurantManagerBase(BaseModel, ABC):
    """
    Base schema class for a restaurant manager.
    """

    pass


class RestaurantManagerBaseOut(RestaurantManagerBase, ABC):
    """
    Base schema class for output representation of a restaurant manager.

    Attributes:
        id (int): The ID of the restaurant manager.
    """

    id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Create

class RestaurantManagerCreateIn(RestaurantManagerBase):
    """
    Schema class for input data when creating a restaurant manager.

    Attributes:
        id (int): The ID of the restaurant manager.
        restaurant_id (int): The ID of the restaurant associated with the manager.
    """

    id: int = Field(ge=0)
    restaurant_id: int = Field(ge=0)


class RestaurantManagerCreateOut(RestaurantManagerBaseOut):
    """
    Schema class for output representation after creating a restaurant manager.
    """

    pass
