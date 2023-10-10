from abc import ABC

from pydantic import BaseModel, Field

__all__ = ['RestaurantManagerRetrieveOut', 'RestaurantManagerCreateIn', 'RestaurantManagerCreateOut']


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


# Retrieve

class RestaurantManagerRetrieveOut(RestaurantManagerBaseOut):
    """
    Schema class for output representation of a retrieved restaurant manager.
    """

    is_active: bool
    restaurant_id: int = Field(ge=0)


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
