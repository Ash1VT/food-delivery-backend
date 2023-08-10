from abc import ABC
from typing import Optional, List

from pydantic import BaseModel, Field
from .menu import MenuOut


class RestaurantBase(BaseModel, ABC):
    pass


class RestaurantOutBase(RestaurantBase, ABC):
    id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }


class RestaurantCreate(RestaurantBase):
    id: int = Field(ge=0)


class RestaurantForUserOut(RestaurantOutBase):
    current_menu: Optional[MenuOut] = Field(default=None)


class RestaurantForManagerOut(RestaurantOutBase):
    current_menu_id: Optional[int] = Field(default=None)
    menus: List[MenuOut] = Field(default=[])
