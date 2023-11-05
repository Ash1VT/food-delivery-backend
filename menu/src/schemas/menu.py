from abc import ABC
from typing import Optional, List

from pydantic import BaseModel, Field
from .category import MenuCategoryRetrieveOut

__all__ = [
    "MenuBase",
    "MenuBaseOut",
    "MenuCategoryRetrieveOut",
    "MenuRetrieveOut",
    "MenuCreateIn",
    "MenuCreateOut",
    "MenuUpdateIn",
    "MenuUpdateOut",
]


# Base

class MenuBase(BaseModel, ABC):
    """
    Base schema class for a menu, containing common attributes.
    """

    name: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(min_length=1, max_length=1000)


class MenuBaseOut(MenuBase, ABC):
    """
    Base schema class for output representation of a menu.
    """

    id: int = Field(ge=0)
    restaurant_id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Retrieve

class MenuRetrieveOut(MenuBaseOut):
    """
    Schema class for output representation of a retrieved menu.
    """

    categories: List[MenuCategoryRetrieveOut]


# Create

class MenuCreateIn(MenuBase):
    """
    Schema class for input data when creating a menu.
    """

    restaurant_id: int = Field(ge=0)


class MenuCreateOut(MenuBaseOut):
    """
    Schema class for output representation after creating a menu.
    """

    pass


# Update

class MenuUpdateIn(MenuBase):
    """
    Schema class for input data when updating a menu.
    """

    pass


class MenuUpdateOut(MenuBaseOut):
    """
    Schema class for output representation after updating a menu.
    """

    pass
