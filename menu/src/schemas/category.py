from abc import ABC
from typing import List

from pydantic import BaseModel, Field
from .item import MenuItemRetrieveOut


# Base

class MenuCategoryBase(BaseModel, ABC):
    """
    Base schema class for a menu category, containing common attributes.

    Attributes:
        name (str): The name of the menu category. Must be between 1 and 100 characters.
    """

    name: str = Field(min_length=1, max_length=100)


class MenuCategoryOutBase(MenuCategoryBase, ABC):
    """
    Base schema class for output representation of a menu category.

    Attributes:
        id (int): The ID of the menu category.
        menu_id (int): The ID of the menu to which belongs menu category.
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

    Attributes:
        items (List[MenuItemRetrieveOut]): A list of retrieved menu items associated with the category.
    """

    items: List[MenuItemRetrieveOut]


# Create

class MenuCategoryCreateIn(MenuCategoryBase):
    """
    Schema class for input data when creating a menu category.

    Attributes:
        menu_id (int): The ID of the menu to which belongs menu category.
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
