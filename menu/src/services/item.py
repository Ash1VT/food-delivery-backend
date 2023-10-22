from typing import Optional, List

from models import RestaurantManager, MenuItem
from exceptions.item import MenuItemNotFoundWithIdError
from exceptions.restaurant import RestaurantNotFoundWithIdError
from exceptions.permissions import PermissionDeniedError
from roles import RestaurantManagerRole
from schemas.item import MenuItemRetrieveOut, MenuItemCreateIn, MenuItemCreateOut, MenuItemUpdateIn, MenuItemUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_ownership_on_restaurant
from .mixins import CreateMixin, UpdateMixin, DeleteMixin

__all__ = [
    'MenuItemService',
]


class MenuItemService(CreateMixin[MenuItem, MenuItemCreateIn, MenuItemCreateOut],
                      UpdateMixin[MenuItem, MenuItemUpdateIn, MenuItemUpdateOut],
                      DeleteMixin[MenuItem]):
    """
    Service class for managing menu items.

    This class provides methods for creating, updating, and deleting menu items.
    It also supports listing menu items of a restaurant.

    Attributes:
        schema_create_out (MenuItemCreateOut): The schema for output representation of created instances.
        schema_update_out (MenuItemUpdateOut): The schema for output representation of updated instances.
    """

    schema_create_out = MenuItemCreateOut
    schema_update_out = MenuItemUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the MenuItemService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def create_instance(self, item: MenuItemCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItem:
        """
        Create a new menu item instance in the repository.

        Args:
            item (MenuItemCreateIn): The data to create the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuItem: The created menu item instance.
        """

        # Permissions checks
        if not self._restaurant_manager:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check restaurant for existence
        if not await uow.restaurants.exists(item.restaurant_id):
            raise RestaurantNotFoundWithIdError(item.restaurant_id)

        # Check if restaurant manager owns restaurant of a menu item to create
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Create
        data = item.model_dump()
        return await uow.items.create(data, **kwargs)

    async def update_instance(self, id: int, item: MenuItemUpdateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItem:
        """
        Update a menu item instance by its ID in the repository.

        Args:
            id (int): The ID of the menu item to update.
            item (MenuItemUpdateIn): The updated instance data.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuItem: The updated menu item instance.
        """

        # Permissions checks
        if not self._restaurant_manager:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        menu_item = await uow.items.retrieve(id)

        if not menu_item:
            raise MenuItemNotFoundWithIdError(id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu_item.restaurant_id)

        # Update
        data = item.model_dump()
        return await uow.items.update(id, data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a menu item instance by its ID from the repository.

        Args:
            id (int): The ID of the menu item to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        # Permissions checks
        if not self._restaurant_manager:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        menu_item = await uow.items.retrieve(id)

        if not menu_item:
            raise MenuItemNotFoundWithIdError(id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu_item.restaurant_id)

        # Delete
        await uow.items.delete(id, **kwargs)

    async def list_restaurant_items_instances(self, restaurant_id: int,
                                              uow: SqlAlchemyUnitOfWork,
                                              **kwargs) -> List[MenuItem]:
        """
        List all menu items instances which belong to restaurant from the repository.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[MenuItem]: List of menu item instances.
        """

        # Permissions checks
        if not self._restaurant_manager:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check if restaurant manager owns Restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # List
        return await uow.items.list_restaurant_items(restaurant_id, **kwargs)

    async def list_restaurant_items(self, restaurant_id: int,
                                    uow: SqlAlchemyUnitOfWork, **kwargs) -> List[MenuItemRetrieveOut]:
        """
        List all menu item schemas which belong to restaurant.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[MenuItemRetrieveOut]: List of menu item schemas.
        """

        instance_list = await self.list_restaurant_items_instances(restaurant_id, uow, **kwargs)
        return [MenuItemRetrieveOut.model_validate(instance) for instance in instance_list]
