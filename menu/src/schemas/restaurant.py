from abc import ABC
from typing import Optional, List

from pydantic import BaseModel, Field
from .menu import MenuRetrieveOut


# Base

class RestaurantBase(BaseModel, ABC):
    """
    Base schema class for a restaurant.
    """

    pass


class RestaurantBaseOut(RestaurantBase, ABC):
    """
    Base schema class for output representation of a restaurant.

    Attributes:
        id (int): The ID of the restaurant.
    """

    id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


# Retrieve

class RestaurantRetrieveOut(RestaurantBaseOut):
    """
    Schema class for output representation of a retrieved restaurant.
    """

    pass


class RestaurantRetrieveForUserOut(RestaurantRetrieveOut):
    """
    Schema class for output representation of a retrieved restaurant for a user.

    Attributes:
        current_menu (Optional[MenuRetrieveOut]): The retrieved current menu associated with the restaurant.
    """

    current_menu: Optional[MenuRetrieveOut]


class RestaurantRetrieveForManagerOut(RestaurantRetrieveOut):
    """
    Schema class for output representation of a retrieved restaurant for a manager.

    Attributes:
        current_menu_id (Optional[int]): The ID of the current menu associated with the restaurant.
        menus (List[MenuRetrieveOut]): A list of retrieved menus associated with the restaurant.
    """

    current_menu_id: Optional[int]
    menus: List[MenuRetrieveOut]


# Create

class RestaurantCreateIn(RestaurantBase):
    """
    Schema class for input data when creating a restaurant.

    Additional Attributes:
        id (int): The ID of the restaurant.
    """

    id: int = Field(ge=0)


class RestaurantCreateOut(RestaurantBaseOut):
    """
    Schema class for output representation after creating a restaurant.
    """

    pass
