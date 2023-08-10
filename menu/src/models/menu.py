from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class Menu(Base):
    __tablename__ = 'menus'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)

    restaurant_id = Column(Integer, ForeignKey('restaurants.id', use_alter=True), nullable=False)

    categories = relationship("Category", secondary="menu_categories_association", uselist=True)
    restaurant = relationship("Restaurant", back_populates="menus", foreign_keys=[restaurant_id], uselist=False)

    def __str__(self):
        return self.name


class MenuCategoryAssociation(Base):
    __tablename__ = 'menu_categories_association'

    menu_id = Column(Integer, ForeignKey('menus.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('categories.id'), primary_key=True)
