from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .base import CustomBase


class Menu(CustomBase):
    __tablename__ = 'menus'

    name = Column(String, nullable=False)
    description = Column(String)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', name='fk_restaurant_id'), nullable=False)

    categories = relationship("MenuCategory", back_populates='menu', uselist=True, cascade="all, delete")

    restaurant = relationship("Restaurant", foreign_keys=[restaurant_id], uselist=False)

    def __str__(self):
        return self.name
