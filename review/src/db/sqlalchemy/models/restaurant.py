from sqlalchemy import Column, BigInteger, Boolean

from .base import Base

__all__ = [
    "Restaurant"
]


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(BigInteger, primary_key=True, autoincrement=False)
    is_active = Column(Boolean, nullable=False, default=True)

