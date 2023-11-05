import enum

from sqlalchemy import Column, String, Enum, Integer, ForeignKey
from sqlalchemy.orm import relationship

from models import CustomBase

__all__ = [
    'ApplicationType',
    'RestaurantApplication',
]


class ApplicationType(enum.Enum):
    create = "create"
    update = "update"


class RestaurantApplication(CustomBase):
    __tablename__ = 'restaurant_applications'

    name = Column(String, nullable=False)
    description = Column(String)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)

    type = Column(Enum(ApplicationType), nullable=False)

    restaurant_manager_id = Column(Integer, ForeignKey('restaurant_managers.id', name='fk_restaurant_manager_id'),
                                   unique=True, nullable=False)

    restaurant_manager = relationship("RestaurantManager", uselist=False)
