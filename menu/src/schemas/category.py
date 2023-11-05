from abc import ABC
from typing import List

from pydantic import BaseModel, Field
from .item import MenuItemRetrieveOut

__all__ = [
    "MenuCategoryBase",
    "MenuCategoryOutBase",
    "MenuCategoryRetrieveOut",
    "MenuCategoryCreateIn",
    "MenuCategoryCreateOut",
    "MenuCategoryUpdateIn",
    "MenuCategoryUpdateOut",
]


# Base

class MenuCategoryBase(BaseModel, ABC):
    """
    Base schema class for a menu category, containing common attributes.
    """

    name: str = Field(min_length=1, max_length=100)


class MenuCategoryOutBase(MenuCategoryBase, ABC):
    """
    Base schema class for output representation of a menu category.
    """

    id: int = Field(ge=0)
    menu_id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Retrieve

class MenuCategoryRetrieveOut(MenuCategoryOutBase):
    """
    Schema class for output representation of a retrieved menu category, building upon MenuCategoryOutBase.
    """

    items: List[MenuItemRetrieveOut]


# Create

class MenuCategoryCreateIn(MenuCategoryBase):
    """
    Schema class for input data when creating a menu category.
    """

    menu_id: int = Field(ge=0)


class MenuCategoryCreateOut(MenuCategoryOutBase):
    """
    Schema class for output representation after creating a menu category.
    """

    pass


# Update

class MenuCategoryUpdateIn(MenuCategoryBase):
    """
    Schema class for input data when updating a menu category.
    """

    pass


class MenuCategoryUpdateOut(MenuCategoryOutBase):
    """
    Schema class for output representation after updating a menu category.
    """

    pass
