from sqlalchemy import Column, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .base import CustomBase

__all__ = ["RestaurantManager"]


class RestaurantManager(CustomBase):
    __tablename__ = 'restaurant_managers'

    id = Column(Integer, primary_key=True, autoincrement=False)
    is_active = Column(Boolean, nullable=False, default=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', name='fk_restaurant_id'), unique=True)

    restaurant = relationship("Restaurant", uselist=False)
