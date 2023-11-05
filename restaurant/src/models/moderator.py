from sqlalchemy import Column, Boolean, Integer

from .base import CustomBase

__all__ = ["Moderator"]


class Moderator(CustomBase):
    __tablename__ = 'moderators'

    id = Column(Integer, primary_key=True, autoincrement=False)
