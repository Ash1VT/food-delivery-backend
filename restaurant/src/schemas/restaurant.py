from abc import ABC
from typing import Optional, List
from pydantic import BaseModel, Field

from .hours import WorkingHoursRetrieveOut

__all__ = [
    "RestaurantBase",
    "RestaurantBaseOut",
    "RestaurantRetrieveOut",
    "RestaurantCreateIn",
    "RestaurantUpdateIn",
]


# Base

class RestaurantBase(BaseModel, ABC):
    """
    Base schema class for a restaurant.
    """

    name: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(min_length=1, max_length=1000)
    address: str = Field(min_length=1, max_length=100)
    phone: str = Field(min_length=1, max_length=30)
    email: str = Field(min_length=1, max_length=50)


class RestaurantBaseOut(RestaurantBase, ABC):
    """
    Base schema class for output representation of a restaurant.
    """

    id: int = Field(ge=0)
    rating: Optional[float]
    reviews_count: int
    image_url: str = Field(min_length=1, max_length=1000)
    is_active: bool

    model_config = {
        "from_attributes": True
    }


# Retrieve

class RestaurantRetrieveOut(RestaurantBaseOut):
    """
    Schema class for output representation of a retrieved restaurant.
    """

    working_hours: List[WorkingHoursRetrieveOut]


# Create

class RestaurantCreateIn(RestaurantBase):
    """
    Schema class for input data when creating a restaurant.
    """

    pass


# Update
class RestaurantUpdateIn(RestaurantBase):
    """
    Schema class for input data when updating a restaurant.
    """

    pass


class RestaurantUpdateOut(RestaurantBaseOut):
    """
    Schema class for output representation of an updated restaurant.
    """

    pass
