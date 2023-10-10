import enum
from sqlalchemy import Column, Time, Integer, ForeignKey, Enum, String, Boolean
from sqlalchemy.orm import relationship

from .base import CustomBase


class DayOfWeek(enum.Enum):
    monday = 1
    tuesday = 2
    wednesday = 3
    thursday = 4
    friday = 5
    saturday = 6
    sunday = 7


class WorkingHours(CustomBase):
    __tablename__ = 'working_hours'

    day_of_week = Column(Enum(DayOfWeek), nullable=False)

    opening_time = Column(Time, nullable=False)
    closing_time = Column(Time, nullable=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id'), nullable=False)


class Restaurant(CustomBase):
    __tablename__ = 'restaurants'

    name = Column(String, nullable=False)
    description = Column(String)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)

    is_active = Column(Boolean, nullable=False, default=False)

    working_hours = relationship("WorkingHours", collection_class=set, uselist=True)

