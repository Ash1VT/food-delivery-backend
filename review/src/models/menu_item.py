from abc import ABC
from dataclasses import dataclass


@dataclass
class MenuItemBaseModel(ABC):
    """
    Base model for a menu item.
    """

    id: int


@dataclass
class MenuItemModel(MenuItemBaseModel):
    """
    Model for a menu item.
    """

    pass


@dataclass
class MenuItemCreateModel(MenuItemBaseModel):
    """
    Model for creating a menu item.
    """

    pass
