from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship

from .base import CustomBase

__all__ = ["Restaurant"]


class Restaurant(CustomBase):
    __tablename__ = 'restaurants'

    name = Column(String, nullable=False)
    description = Column(String)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)

    is_active = Column(Boolean, nullable=False, default=True)

    working_hours = relationship("WorkingHours", back_populates="restaurant", uselist=True)
