from abc import ABC
from typing import List

from pydantic import BaseModel, Field
from .item import MenuItemOut


class CategoryBase(BaseModel, ABC):
    name: str = Field(min_length=1, max_length=100)


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int = Field(ge=0)
    items: List[MenuItemOut] = Field(default=[])

    model_config = {
        "from_attributes": True
    }
