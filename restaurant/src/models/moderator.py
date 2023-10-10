from sqlalchemy import Column, Boolean

from .base import CustomBase

__all__ = ["Moderator"]


class Moderator(CustomBase):
    __tablename__ = 'moderators'

    is_active = Column(Boolean, default=False)
