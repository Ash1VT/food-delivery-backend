from models import Moderator
from .generic import SQLAlchemyRepository

__all__ = [
    "ModeratorRepository",
]


class ModeratorRepository(SQLAlchemyRepository[Moderator]):
    """
    Repository for Moderator model operations.
    """

    model = Moderator
