from abc import ABC
from datetime import time
from pydantic import BaseModel, Field, field_validator, field_serializer

from models import DayOfWeek

__all__ = [
    "WorkingHoursRetrieveOut",
    "WorkingHoursCreateIn",
    "WorkingHoursCreateOut",
    "WorkingHoursUpdateIn",
    "WorkingHoursUpdateOut"
]


# Base

class WorkingHoursBase(BaseModel, ABC):
    """
    Base schema class for working hours.
    """

    opening_time: time
    closing_time: time

    @field_validator('opening_time', 'closing_time')
    @classmethod
    def check_time(cls, time_value: time):
        if time_value is not None:
            if time_value.second != 0:
                raise ValueError("Time must not include seconds")
            if time_value.microsecond != 0:
                raise ValueError("Time must not include microseconds")
        return time_value


class WorkingHoursBaseOut(WorkingHoursBase, ABC):
    """
    Base schema class for output representation of working hours.
    """

    id: int = Field(ge=0)
    day_of_week: DayOfWeek

    @field_serializer('opening_time', 'closing_time')
    def serialize_time(self, time: time, _info):
        return time.strftime("%H:%M")

    model_config = {
        "from_attributes": True,
        "use_enum_values": True
    }


# Retrieve

class WorkingHoursRetrieveOut(WorkingHoursBaseOut):
    """
    Schema class for output representation of a retrieved working hours.
    """

    pass


# Create

class WorkingHoursCreateIn(WorkingHoursBase):
    """
    Schema class for input data when creating working hours.
    """

    day_of_week: DayOfWeek
    restaurant_id: int = Field(ge=0)


class WorkingHoursCreateOut(WorkingHoursBaseOut):
    """
    Schema class for output representation after creating working hours.
    """

    pass


# Update

class WorkingHoursUpdateIn(WorkingHoursBase):
    """
    Schema class for input data when updating working hours.
    """

    pass


class WorkingHoursUpdateOut(WorkingHoursBaseOut):
    """
    Schema class for output representation after updating working hours.
    """

    pass
