from abc import ABC

from models.menu_item import MenuItemModel, MenuItemCreateModel
from repositories.interfaces.mixins import IDeleteMixin, ICreateMixin, IRetrieveMixin


class IMenuItemRepository(IRetrieveMixin[MenuItemModel],
                          ICreateMixin[MenuItemModel, MenuItemCreateModel],
                          IDeleteMixin,
                          ABC):
    """
    Interface for menu item repository.
    """

    pass
