from typing import Optional, List

from multimethod import multimethod

from models import RestaurantManager, Menu, MenuCategory
from exceptions import MenuNotFoundWithIdError, RestaurantNotFoundWithIdError, CurrentMenuMissingError
from schemas import MenuRetrieveOut, \
    MenuCreateIn, MenuCreateOut, \
    MenuUpdateIn, MenuUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_is_active, check_restaurant_manager_ownership_on_restaurant
from .mixins import RetrieveMixin, ListMixin, CreateMixin, UpdateMixin, DeleteMixin
from .category import MenuCategoryService


class MenuService(RetrieveMixin[Menu, MenuRetrieveOut],
                  ListMixin[Menu, MenuRetrieveOut],
                  CreateMixin[Menu, MenuCreateIn, MenuCreateOut],
                  UpdateMixin[Menu, MenuUpdateIn, MenuUpdateOut],
                  DeleteMixin[Menu]):
    """
    Service class for managing menus.

    This class provides methods for retrieving, listing, creating, updating, and deleting menu instances.
    It also supports adding menu categories to menus.

    Attributes:
        schema_retrieve_out (MenuRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (MenuCreateOut): The schema for output representation of created instances.
        schema_update_out (MenuUpdateOut): The schema for output representation of updated instances.
    """

    schema_retrieve_out = MenuRetrieveOut
    schema_create_out = MenuCreateOut
    schema_update_out = MenuUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the MenuService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork,
                                fetch_categories: bool = False, **kwargs) -> Menu:
        """
        Retrieve a menu instance by its ID from the repository.

        Args:
            id (int): The ID of the menu to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_categories (bool): Whether to fetch associated categories.

        Returns:
            Menu: The retrieved menu instance.
        """

        retrieved_instance = await uow.menus.retrieve(id, fetch_categories=fetch_categories, **kwargs)

        if not retrieved_instance:
            raise MenuNotFoundWithIdError(id)

        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork, fetch_categories: bool = False, **kwargs) -> List[Menu]:
        """
        List all menu instances from the repository.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_categories (bool): Whether to fetch associated categories.

        Returns:
            List[Menu]: List of menu instances.
        """

        return await uow.menus.list(fetch_categories=fetch_categories, **kwargs)

    async def create_instance(self, item: MenuCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Menu:
        """
        Create a new menu instance in the repository.

        Args:
            item (MenuCreateIn): The data to create the menu.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Menu: The created menu instance.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Restaurant

        if not await uow.restaurants.exists(item.restaurant_id):
            raise RestaurantNotFoundWithIdError(item.restaurant_id)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Create

        data = item.model_dump()

        return await uow.menus.create(data, **kwargs)

    async def update_instance(self, id: int, item: MenuUpdateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Menu:
        """
        Update a menu instance by its ID in the repository.

        Args:
            id (int): The ID of the menu to update.
            item (MenuUpdateIn): The updated instance data.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Menu: The updated menu instance.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Menu

        retrieved_instance = await self.retrieve_instance(id, uow)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, retrieved_instance.restaurant_id)

        # Update

        data = item.model_dump()

        return await uow.menus.update(id, data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a menu instance by its ID from the repository.

        Args:
            id (int): The ID of the menu to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Menu

        retrieved_instance = await self.retrieve_instance(id, uow)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, retrieved_instance.restaurant_id)

        # Delete

        await uow.menus.delete(id, **kwargs)

    async def retrieve_current_restaurant_menu_instance(self, restaurant_id: int, uow: SqlAlchemyUnitOfWork,
                                                        fetch_categories: bool = False, **kwargs) -> Menu:
        """
        Retrieve a current menu instance by restaurant's ID from the repository.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_categories (bool): Whether to fetch associated categories.

        Returns:
            Menu: The retrieved current menu instance.
        """

        retrieved_current_menu = await uow.menus.retrieve_current_restaurant_menu(restaurant_id,
                                                                                  fetch_categories=fetch_categories,
                                                                                  **kwargs)

        if not retrieved_current_menu:
            raise CurrentMenuMissingError(restaurant_id)

        return retrieved_current_menu

    async def list_restaurant_menus_instances(self, restaurant_id: int,
                                              uow: SqlAlchemyUnitOfWork,
                                              fetch_categories: bool = False, **kwargs) -> List[Menu]:
        """
        List all menu instances which belong to restaurant from the repository.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_categories (bool): Whether to fetch associated categories.

        Returns:
            List[Menu]: List of menu instances.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Restaurant

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # List

        return await uow.menus.list_restaurant_menus(restaurant_id, fetch_categories=fetch_categories, **kwargs)

    async def retrieve(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuRetrieveOut:
        """
        Retrieve a menu schema by its ID with associated categories.

        Args:
            id (int): The ID of the menu to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuRetrieveOut: The retrieved menu schema with associated categories.
        """

        return await super().retrieve(id, uow, fetch_categories=True, **kwargs)

    async def list(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[MenuRetrieveOut]:
        """
        List all menu schemas with associated categories.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[MenuRetrieveOut]: List of menu schemas with associated categories.
        """

        return await super().list(uow, fetch_categories=True, **kwargs)

    async def retrieve_current_restaurant_menu(self, restaurant_id: int,
                                               uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuRetrieveOut:
        """
        Retrieve a current menu schema restaurant's ID with associated categories.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuRetrieveOut: The retrieved current menu schema with associated categories.
        """

        retrieved_instance = await self.retrieve_current_restaurant_menu_instance(restaurant_id, uow,
                                                                                  fetch_categories=True, **kwargs)

        return self.get_retrieve_schema(retrieved_instance)

    async def list_restaurant_menus(self, restaurant_id: int,
                                    uow: SqlAlchemyUnitOfWork, **kwargs) -> List[MenuRetrieveOut]:
        """
        List all menu schemas which belong to restaurant with associated categories.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[MenuRetrieveOut]: List of menu schemas with associated categories.
        """

        instance_list = await self.list_restaurant_menus_instances(restaurant_id, uow, fetch_categories=True, **kwargs)

        return self.get_list_schema(instance_list)
