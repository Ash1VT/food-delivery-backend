from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

from .base import CustomBase


class Menu(CustomBase):
    __tablename__ = 'menus'

    name = Column(String, nullable=False)
    description = Column(String)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', use_alter=True), nullable=False)

    categories = relationship("MenuCategory", back_populates='menu', uselist=True)

    restaurant = relationship("Restaurant", foreign_keys=[restaurant_id], uselist=False)

    def __str__(self):
        return self.name
