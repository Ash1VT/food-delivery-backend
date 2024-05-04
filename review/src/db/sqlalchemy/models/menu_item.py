from sqlalchemy import Column, BigInteger

from .base import Base

__all__ = [
    "MenuItem"
]


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(BigInteger, primary_key=True, autoincrement=False)
