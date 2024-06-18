from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship

from .base import CustomBase


class MenuItem(CustomBase):
    __tablename__ = 'menu_items'

    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Integer, nullable=False)
    image_url = Column(String, nullable=False)

    rating = Column(Float(decimal_return_scale=2), nullable=True)
    reviews_count = Column(Integer, nullable=False, default=0)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', name='fk_restaurant_id'), nullable=False)

    restaurant = relationship("Restaurant", uselist=False)

    def __str__(self):
        return self.name
