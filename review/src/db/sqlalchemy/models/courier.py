from sqlalchemy import Column, BigInteger

from .base import Base

__all__ = [
    "Courier"
]


class Courier(Base):
    __tablename__ = "couriers"

    id = Column(BigInteger, primary_key=True, autoincrement=False)
