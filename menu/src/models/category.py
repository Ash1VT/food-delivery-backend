from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base, CustomBase

category_items_association = Table(
    "category_items_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey('menu_items.id',
                                          name='fk_item_id'), primary_key=True),
    Column("category_id", Integer, ForeignKey('menu_categories.id',
                                              name='fk_category_id'), primary_key=True),
)


class MenuCategory(CustomBase):
    __tablename__ = 'menu_categories'

    name = Column(String, nullable=False)
    image_url = Column(String, nullable=False)

    menu_id = Column(Integer, ForeignKey('menus.id',
                                         name='fk_menu_id',
                                         ondelete="CASCADE"), nullable=False)

    menu = relationship("Menu", back_populates='categories', uselist=False)

    items = relationship("MenuItem", secondary="category_items_association",
                         collection_class=set,
                         uselist=True,
                         cascade="all, delete",
                         single_parent=True
                         )

    def __str__(self):
        return self.name
