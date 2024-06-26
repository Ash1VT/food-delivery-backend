from abc import ABC

from pydantic import BaseModel, Field

__all__ = [
    "RestaurantBase",
    "RestaurantBaseOut",
    "RestaurantRetrieveOut",
    "RestaurantCreateIn",
    "RestaurantCreateOut",
    "RestaurantUpdateIn",
    "RestaurantUpdateOut",
]


# Base

class RestaurantBase(BaseModel, ABC):
    """
    Base schema class for a restaurant.
    """

    pass


class RestaurantBaseOut(RestaurantBase, ABC):
    """
    Base schema class for output representation of a restaurant.
    """

    id: int = Field(ge=0)
    is_active: bool

    model_config = {
        "from_attributes": True
    }


# Retrieve

class RestaurantRetrieveOut(RestaurantBaseOut):
    """
    Schema class for output representation of a retrieved restaurant.
    """

    pass


# Create

class RestaurantCreateIn(RestaurantBase):
    """
    Schema class for input data when creating a restaurant.
    """

    id: int = Field(ge=0)
    is_active: bool
    restaurant_manager_id: int = Field(ge=0)


class RestaurantCreateOut(RestaurantBaseOut):
    """
    Schema class for output representation after creating a restaurant.
    """

    pass


# Update

class RestaurantUpdateIn(RestaurantBase):
    """
    Schema class for input data when updating a restaurant.
    """

    is_active: bool


class RestaurantUpdateOut(RestaurantBaseOut):
    """
    Schema class for output representation after updating a restaurant.
    """

    pass
