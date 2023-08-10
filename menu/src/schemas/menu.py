from abc import ABC
from typing import Optional, List

from pydantic import BaseModel, Field
from .category import CategoryOut


class MenuBase(BaseModel, ABC):
    name: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, min_length=1, max_length=1000)
    restaurant_id: int = Field(ge=0)


class MenuCreate(MenuBase):
    pass


class MenuOut(MenuBase):
    id: int = Field(ge=0)
    categories: List[CategoryOut] = Field(default=[])

    model_config = {
        "from_attributes": True
    }
