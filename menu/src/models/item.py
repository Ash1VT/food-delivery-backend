from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .base import CustomBase


class MenuItem(CustomBase):
    __tablename__ = 'menu_items'

    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Integer, nullable=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', use_alter=True), nullable=False)

    categories = relationship("MenuCategory", secondary="category_items_association", back_populates="items",
                              uselist=True)

    restaurant = relationship("Restaurant", uselist=False)

    def __str__(self):
        return self.name
