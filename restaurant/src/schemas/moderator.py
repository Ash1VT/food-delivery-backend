from abc import ABC

from pydantic import BaseModel, Field

__all__ = [
    "ModeratorRetrieveOut",
    "ModeratorCreateIn",
    "ModeratorCreateOut",
]


# Base

class ModeratorBase(BaseModel, ABC):
    """
    Base schema class for a moderator.
    """

    pass


class ModeratorBaseOut(ModeratorBase, ABC):
    """
    Base schema class for output representation of a moderator.
    """

    id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Retrieve

class ModeratorRetrieveOut(ModeratorBaseOut):
    """
    Schema class for output representation of a retrieved moderator.
    """

    pass


# Create

class ModeratorCreateIn(ModeratorBase):
    """
    Schema class for input data when creating a moderator.
    """

    id: int = Field(ge=0)


class ModeratorCreateOut(ModeratorBaseOut):
    """
    Schema class for output representation after creating a moderator.
    """

    pass
