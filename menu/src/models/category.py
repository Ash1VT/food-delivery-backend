from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base, CustomBase

category_items_association = Table(
    "category_items_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey('menu_items.id'), primary_key=True),
    Column("category_id", Integer, ForeignKey('menu_categories.id'), primary_key=True),
)


class MenuCategory(CustomBase):
    __tablename__ = 'menu_categories'

    name = Column(String, nullable=False)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', use_alter=True), nullable=False)

    items = relationship("MenuItem", secondary="category_items_association", back_populates="categories",
                         uselist=True)

    restaurant = relationship("Restaurant", uselist=False)

    def __str__(self):
        return self.name
