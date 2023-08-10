from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class MenuItem(Base):
    __tablename__ = 'menu_items'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Integer, nullable=False)

    categories = relationship("Category", secondary="menu_items_categories_association", back_populates="items",
                              uselist=True)

    def __str__(self):
        return self.name


class MenuItemCategoryAssociation(Base):
    __tablename__ = 'menu_items_categories_association'

    menu_item_id = Column(Integer, ForeignKey('menu_items.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('categories.id'), primary_key=True)
