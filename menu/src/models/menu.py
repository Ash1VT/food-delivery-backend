from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

from .base import Base, CustomBase

menu_categories_association = Table(
    "menu_categories_association",
    Base.metadata,
    Column("menu_id", Integer, ForeignKey('menus.id'), primary_key=True),
    Column("category_id", Integer, ForeignKey('menu_categories.id'), primary_key=True),
)


class Menu(CustomBase):
    __tablename__ = 'menus'

    name = Column(String, nullable=False)
    description = Column(String)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', use_alter=True), nullable=False)

    categories = relationship("MenuCategory", secondary="menu_categories_association", uselist=True)

    restaurant = relationship("Restaurant", back_populates="menus", foreign_keys=[restaurant_id], uselist=False)

    def __str__(self):
        return self.name
