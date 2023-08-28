from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .base import CustomBase


class Restaurant(CustomBase):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True, autoincrement=False)
    current_menu_id = Column(Integer, ForeignKey('menus.id', use_alter=True), unique=True)

    current_menu = relationship("Menu", foreign_keys=[current_menu_id], uselist=False, post_update=True)
    menus = relationship("Menu", foreign_keys="Menu.restaurant_id")

    def __str__(self):
        return str(self.id)
