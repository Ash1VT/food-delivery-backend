from abc import ABC
from typing import Optional

from models.menu_item import MenuItemModel, MenuItemCreateModel
from models.rating import RatingModel
from repositories.interfaces.mixins import IDeleteMixin, ICreateMixin, IRetrieveMixin


class IMenuItemRepository(IRetrieveMixin[MenuItemModel],
                          ICreateMixin[MenuItemModel, MenuItemCreateModel],
                          IDeleteMixin,
                          ABC):
    """
    Interface for menu item repository.
    """

    async def retrieve_menu_item_rating(self, menu_item_id: int) -> Optional[RatingModel]:
        """
        Retrieve menu item rating.

        Args:
            menu_item_id (int): The ID of the menu item.

        Returns:
            Optional[RatingModel]: The menu item rating or None if not found.
        """

        raise NotImplementedError
