from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from .base import Base


class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    items = relationship("MenuItem", secondary="menu_items_categories_association", back_populates="categories",
                         uselist=True)

    def __str__(self):
        return self.name
