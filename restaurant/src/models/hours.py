import enum
from sqlalchemy import Column, Time, Integer, ForeignKey, Enum
from .base import CustomBase

__all__ = ["DayOfWeek", "WorkingHours"]


class DayOfWeek(enum.Enum):
    monday = "monday"
    tuesday = "tuesday"
    wednesday = "wednesday"
    thursday = "thursday"
    friday = "friday"
    saturday = "saturday"
    sunday = "sunday"


class WorkingHours(CustomBase):
    __tablename__ = 'working_hours'

    day_of_week = Column(Enum(DayOfWeek), nullable=False)

    opening_time = Column(Time, nullable=False)
    closing_time = Column(Time, nullable=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id'), nullable=False)
