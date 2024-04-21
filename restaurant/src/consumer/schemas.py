from pydantic import BaseModel, Field

from schemas.manager import RestaurantManagerCreateIn
from schemas.moderator import ModeratorCreateIn

__all__ = [
    "RestaurantManagerCreatedSchema",
    "ModeratorCreatedSchema"
]


class RestaurantManagerCreatedSchema(BaseModel):
    """
    Schema class for output representation of a created restaurant manager.
    """

    id: int = Field(ge=0)


class ModeratorCreatedSchema(BaseModel):
    """
    Schema class for output representation of a created restaurant manager.
    """

    id: int = Field(ge=0)
