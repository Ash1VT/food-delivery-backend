from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class Restaurant(Base):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True, autoincrement=False)
    current_menu_id = Column(Integer, ForeignKey('menus.id', use_alter=True), unique=True)

    current_menu = relationship("Menu", foreign_keys=[current_menu_id], uselist=False, post_update=True)
    menus = relationship("Menu", back_populates="restaurant", foreign_keys="Menu.restaurant_id")

    def __str__(self):
        return str(self.id)
