from typing import Optional, List

from models import RestaurantManager, MenuItem
from exceptions import MenuItemNotFoundWithIdError, RestaurantNotFoundWithIdError
from schemas import MenuItemRetrieveOut, \
    MenuItemCreateIn, MenuItemCreateOut, \
    MenuItemUpdateIn, MenuItemUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_is_active, check_restaurant_manager_ownership_on_restaurant
from .mixins import RetrieveMixin, ListMixin, CreateMixin, UpdateMixin, DeleteMixin


class MenuItemService(RetrieveMixin[MenuItem, MenuItemRetrieveOut],
                      ListMixin[MenuItem, MenuItemRetrieveOut],
                      CreateMixin[MenuItem, MenuItemCreateIn, MenuItemCreateOut],
                      UpdateMixin[MenuItem, MenuItemUpdateIn, MenuItemUpdateOut],
                      DeleteMixin[MenuItem]):
    """
    Service class for managing menu items.

    This class provides methods for retrieving, listing, creating, updating, and deleting menu items.

    Attributes:
        schema_retrieve_out (MenuItemRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (MenuItemCreateOut): The schema for output representation of created instances.
        schema_update_out (MenuItemUpdateOut): The schema for output representation of updated instances.
    """

    schema_retrieve_out = MenuItemRetrieveOut
    schema_create_out = MenuItemCreateOut
    schema_update_out = MenuItemUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the MenuItemService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItem:
        """
        Retrieve a menu item instance by its ID from the repository.

        Args:
            id (int): The ID of the menu item to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuItem: The retrieved menu item instance.
        """

        retrieved_instance = await uow.items.retrieve(id, **kwargs)

        if not retrieved_instance:
            raise MenuItemNotFoundWithIdError(id)

        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[MenuItem]:
        """
        List all menu item instances from the repository.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[MenuItem]: List of menu item instances.
        """

        return await uow.items.list(**kwargs)

    async def create_instance(self, item: MenuItemCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItem:
        """
        Create a new menu item instance in the repository.

        Args:
            item (MenuItemCreateIn): The data to create the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuItem: The created menu item instance.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Restaurant

        if not await uow.restaurants.exists(item.restaurant_id):
            raise RestaurantNotFoundWithIdError(item.restaurant_id)

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

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Item

        retrieved_instance = await self.retrieve_instance(id, uow)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, retrieved_instance.restaurant_id)

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

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Item

        retrieved_instance = await self.retrieve_instance(id, uow)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, retrieved_instance.restaurant_id)

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

        check_restaurant_manager_is_active(self._restaurant_manager)

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

        return self.get_list_schema(instance_list)
