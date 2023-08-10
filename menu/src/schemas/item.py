from abc import ABC
from typing import Optional

from pydantic import BaseModel, Field


class MenuItemBase(BaseModel, ABC):
    name: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, min_length=1, max_length=1000)
    price: int = Field(gt=0)


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemOut(MenuItemBase):
    id: int = Field(ge=0)

    model_config = {
        "from_attributes": True
    }
