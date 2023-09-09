from sqlalchemy import Column, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from .base import CustomBase


class RestaurantManager(CustomBase):
    __tablename__ = 'restaurant_managers'

    id = Column(Integer, primary_key=True, autoincrement=False)

    is_active = Column(Boolean, default=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', name='fk_restaurant_id'), unique=True, nullable=False)

    restaurant = relationship("Restaurant", uselist=False)
