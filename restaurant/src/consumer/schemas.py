from pydantic import BaseModel, Field

from schemas.manager import RestaurantManagerCreateIn
from schemas.moderator import ModeratorCreateIn

__all__ = [
    "RestaurantManagerCreatedSchema",
    "ModeratorCreatedSchema"
]


class RestaurantManagerCreatedSchema(RestaurantManagerCreateIn):
    """
    Schema class for output representation of a created restaurant manager.
    """

    pass


class ModeratorCreatedSchema(ModeratorCreateIn):
    """
    Schema class for output representation of a created restaurant manager.
    """

    pass
