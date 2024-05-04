from sqlalchemy import Column, BigInteger

from .base import Base

__all__ = [
    "Restaurant"
]


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(BigInteger, primary_key=True, autoincrement=False)
