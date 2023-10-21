from abc import ABC

from pydantic import Field

from models import ApplicationType
from .restaurant import RestaurantBase

__all__ = [
    "RestaurantApplicationBase",
    "RestaurantApplicationBaseOut",
    "RestaurantApplicationRetrieveOut",
    "RestaurantApplicationCreateOut",
]


# Base

class RestaurantApplicationBase(RestaurantBase, ABC):
    """
    Base schema class for a restaurant application.
    """

    pass


class RestaurantApplicationBaseOut(RestaurantApplicationBase, ABC):
    """
    Base schema class for output representation of a restaurant application.
    """

    id: int = Field(ge=0)
    restaurant_manager_id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Retrieve

class RestaurantApplicationRetrieveOut(RestaurantApplicationBaseOut):
    """
    Schema class for output representation of a retrieved restaurant application.
    """

    type: ApplicationType


# Create

class RestaurantApplicationCreateOut(RestaurantApplicationBaseOut):
    """
    Schema class for output representation after creating a restaurant application.
    """

    type: ApplicationType
