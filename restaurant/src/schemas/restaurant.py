from abc import ABC
from typing import Optional, Set
from datetime import time
from pydantic import BaseModel, Field

__all__ = ['WorkingHours', 'RestaurantRetrieveOut', 'RestaurantCreateIn', 'RestaurantCreateOut']


# Working hours

class WorkingHours(BaseModel):
    day_of_week: str = Field(min_length=1, max_length=20)
    opening_time: time
    closing_time: time

    model_config = {
        "from_attributes": True
    }


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

    model_config = {
        "from_attributes": True
    }


# Retrieve

class RestaurantRetrieveOut(RestaurantBaseOut):
    """
    Schema class for output representation of a retrieved restaurant.
    """

    working_hours: Set[WorkingHours]


# Create

class RestaurantCreateIn(RestaurantBase):
    """
    Schema class for input data when creating a restaurant.
    """

    pass


class RestaurantCreateOut(RestaurantBaseOut):
    """
    Schema class for output representation after creating a restaurant.
    """

    pass
