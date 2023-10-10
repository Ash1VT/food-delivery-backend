from abc import ABC
from datetime import time
from pydantic import BaseModel, Field

from models.hours import DayOfWeek

__all__ = ["WorkingHoursRetrieveOut", "WorkingHoursCreateIn", "WorkingHoursCreateOut",
           "WorkingHoursUpdateIn", "WorkingHoursUpdateOut"]


# Base

class WorkingHoursBase(BaseModel, ABC):
    """
    Base schema class for working hours.
    """

    opening_time: time
    closing_time: time


class WorkingHoursBaseOut(WorkingHoursBase, ABC):
    """
    Base schema class for output representation of working hours.
    """

    id: int = Field(ge=0)
    day_of_week: DayOfWeek

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
