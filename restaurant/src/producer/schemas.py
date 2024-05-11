from datetime import time
from typing import Optional

from pydantic import BaseModel, Field
from models import DayOfWeek

__all__ = [
    "RestaurantCreatedSchema",
    "RestaurantUpdatedSchema",
    "RestaurantCreatedToReviewSchema",
    "RestaurantUpdatedToReviewSchema",
    "WorkingHoursCreatedSchema",
    "WorkingHoursUpdatedSchema",
    "WorkingHoursDeletedSchema",
]


class RestaurantCreatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when restaurant is created
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    address: str
    restaurant_manager_id: int = Field(ge=0)
    is_active: bool


class RestaurantUpdatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when it is updated
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    address: Optional[str]
    is_active: Optional[bool]


class RestaurantCreatedToReviewSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when restaurant is created
    to data that will be published to Kafka for review microservice.
    """

    id: int = Field(ge=0)
    is_active: bool


class RestaurantUpdatedToReviewSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when it is updated
    to data that will be published to Kafka for review microservice.
    """

    id: int = Field(ge=0)
    is_active: bool


class WorkingHoursCreatedSchema(BaseModel):
    """
    Schema class for output representation of data of working hours when it is created
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    day_of_week: DayOfWeek
    opening_time: time
    closing_time: time
    restaurant_id: int = Field(ge=0)


class WorkingHoursUpdatedSchema(BaseModel):
    """
    Schema class for output representation of data of working hours when it is updated
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    opening_time: time
    closing_time: time


class WorkingHoursDeletedSchema(BaseModel):
    """
    Schema class for output representation of data of working hours when it is deleted
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
