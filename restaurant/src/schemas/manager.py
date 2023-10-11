from abc import ABC

from pydantic import BaseModel, Field

__all__ = ["RestaurantManagerRetrieveOut",
           "RestaurantManagerCreateIn",
           "RestaurantManagerCreateOut",
           "RestaurantManagerUpdateIn",
           "RestaurantManagerUpdateOut"
           ]


# Base

class RestaurantManagerBase(BaseModel, ABC):
    """
    Base schema class for a restaurant manager.
    """

    pass


class RestaurantManagerBaseOut(RestaurantManagerBase, ABC):
    """
    Base schema class for output representation of a restaurant manager.
    """

    id: int = Field(ge=0)
    is_active: bool

    model_config = {
        "from_attributes": True
    }


# Retrieve

class RestaurantManagerRetrieveOut(RestaurantManagerBaseOut):
    """
    Schema class for output representation of a retrieved restaurant manager.
    """

    restaurant_id: int = Field(ge=0)


# Create

class RestaurantManagerCreateIn(RestaurantManagerBase):
    """
    Schema class for input data when creating a restaurant manager.
    """

    id: int = Field(ge=0)
    restaurant_id: int = Field(ge=0)


class RestaurantManagerCreateOut(RestaurantManagerBaseOut):
    """
    Schema class for output representation after creating a restaurant manager.
    """

    pass


# Update

class RestaurantManagerUpdateIn(RestaurantManagerBase):
    """
    Schema class for input data when updating a restaurant manager.
    """

    is_active: bool


class RestaurantManagerUpdateOut(RestaurantManagerBaseOut):
    """
    Schema class for output representation after updating a restaurant manager.
    """

    pass
