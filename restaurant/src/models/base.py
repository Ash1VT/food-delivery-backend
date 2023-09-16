from sqlalchemy import Column, Integer
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class CustomBase(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True)
