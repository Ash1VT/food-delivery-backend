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

    menu_id = Column(Integer, ForeignKey('menus.id', use_alter=True), nullable=False)

    menu = relationship("Menu", back_populates='categories', uselist=False)

    items = relationship("MenuItem", secondary="category_items_association", back_populates="categories",
                         collection_class=set, uselist=True)

    def __str__(self):
        return self.name
