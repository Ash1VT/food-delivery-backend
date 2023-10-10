from sqlalchemy import Column, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .base import CustomBase


class RestaurantManager(CustomBase):
    __tablename__ = 'restaurant_managers'

    is_active = Column(Boolean, default=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', name='fk_restaurant_id'), unique=True, nullable=False)

    restaurant = relationship("Restaurant", uselist=False)
