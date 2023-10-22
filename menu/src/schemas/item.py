from abc import ABC
from typing import Optional

from pydantic import BaseModel, Field

__all__ = [
    "MenuItemBase",
    "MenuItemBaseOut",
    "MenuItemRetrieveOut",
    "MenuItemCreateIn",
    "MenuItemCreateOut",
    "MenuItemUpdateIn",
    "MenuItemUpdateOut",
]


# Base

class MenuItemBase(BaseModel, ABC):
    """
    Base schema class for a menu item, containing common attributes.
    """

    name: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(min_length=1, max_length=1000)
    price: int = Field(gt=0)


class MenuItemBaseOut(MenuItemBase, ABC):
    """
    Base schema class for output representation of a menu item.
    """

    id: int = Field(ge=0)
    restaurant_id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Retrieve

class MenuItemRetrieveOut(MenuItemBaseOut):
    """
    Schema class for output representation of a retrieved menu item.
    """

    pass


# Create

class MenuItemCreateIn(MenuItemBase):
    """
    Schema class for input data when creating a menu item.
    """

    restaurant_id: int = Field(ge=0)


class MenuItemCreateOut(MenuItemBaseOut):
    """
    Schema class for output representation after creating a menu item.
    """

    pass


# Update

class MenuItemUpdateIn(MenuItemBase):
    """
    Schema class for input data when updating a menu item.
    """

    pass


class MenuItemUpdateOut(MenuItemBaseOut):
    """
    Schema class for output representation after updating a menu item.
    """

    pass
