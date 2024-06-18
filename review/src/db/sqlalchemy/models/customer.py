from sqlalchemy import Column, BigInteger, String

from db.sqlalchemy.models.base import Base

__all__ = [
    "Customer"
]


class Customer(Base):
    __tablename__ = "customers"

    id = Column(BigInteger, primary_key=True, autoincrement=False)
    full_name = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
