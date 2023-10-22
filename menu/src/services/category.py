from typing import List, Optional

from multimethod import multimethod

from exceptions import MenuNotFoundWithIdError, MenuItemNotFoundWithIdError, PermissionDeniedError
from models import RestaurantManager, MenuCategory, MenuItem, Restaurant
from exceptions.item import MenuItemAlreadyInCategoryError, MenuItemNotInCategoryError
from exceptions.category import MenuCategoryNotFoundWithIdError
from exceptions.restaurant import RestaurantNotFoundWithIdError
from uow import SqlAlchemyUnitOfWork
from roles import RestaurantManagerRole

from schemas import MenuCategoryCreateIn, MenuCategoryUpdateIn, MenuCategoryRetrieveOut, \
    MenuCategoryCreateOut, MenuCategoryUpdateOut
from utils import check_restaurant_manager_is_active, check_restaurant_manager_ownership_on_restaurant, \
    check_restaurant_manager_ownership_on_menu, check_restaurant_manager_is_email_verified
from .mixins import RetrieveMixin, ListMixin, CreateMixin, UpdateMixin, DeleteMixin


class MenuCategoryService(RetrieveMixin[MenuCategory, MenuCategoryRetrieveOut],
                          CreateMixin[MenuCategory, MenuCategoryCreateIn, MenuCategoryCreateOut],
                          UpdateMixin[MenuCategory, MenuCategoryUpdateIn, MenuCategoryUpdateOut],
                          DeleteMixin[MenuCategory]):
    """
    Service class for managing menu categories.

    This class provides methods for retrieving, listing, creating, updating, and deleting menu categories.
    It also supports adding menu items to menu categories.

    Attributes:
        schema_retrieve_out (MenuCategoryRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (MenuCategoryCreateOut): The schema for output representation of created instances.
        schema_update_out (MenuCategoryUpdateOut): The schema for output representation of updated instances.
    """

    schema_retrieve_out = MenuCategoryRetrieveOut
    schema_create_out = MenuCategoryCreateOut
    schema_update_out = MenuCategoryUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the MenuCategoryService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork,
                                fetch_items: bool = False, **kwargs) -> MenuCategory:
        """
        Retrieve a menu category instance by its ID from the repository.

        Args:
            id (int): The ID of the menu category to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_items (bool, optional): Whether to fetch associated menu items. Defaults to False.

        Returns:
            MenuCategory: The retrieved menu category instance.
        """

        retrieved_menu_category = await uow.categories.retrieve(id, fetch_items=fetch_items, **kwargs)

        if not retrieved_menu_category:
            raise MenuCategoryNotFoundWithIdError(id)

        # Get restaurant by menu category
        restaurant = await uow.restaurants.retrieve_by_category(retrieved_menu_category.id)

        if not restaurant:
            raise RestaurantNotFoundWithIdError(restaurant.id)

        # Permissions checks if restaurant is not active
        if not restaurant.is_active:
            if self._restaurant_manager:
                check_restaurant_manager_is_active(self._restaurant_manager)
                check_restaurant_manager_is_email_verified(self._restaurant_manager)
                check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)
            else:
                raise PermissionDeniedError(RestaurantManagerRole)

        return retrieved_menu_category

    # async def list_instances(self, uow: SqlAlchemyUnitOfWork,
    #                          fetch_items: bool = False, **kwargs) -> List[MenuCategory]:
    #     """
    #     List all menu category instances from the repository.
    #
    #     Args:
    #         uow (SqlAlchemyUnitOfWork): The unit of work instance.
    #         fetch_items (bool, optional): Whether to fetch associated menu items. Defaults to False.
    #
    #     Returns:
    #         List[MenuCategory]: List of menu category instances.
    #     """
    #
    #     # Get restaurant by menu category
    #     restaurant = await uow.restaurants.retrieve_by_category(retrieved_menu_category.id)
    #
    #     if not restaurant:
    #         raise RestaurantNotFoundWithIdError(restaurant.id)
    #
    #     # Permissions checks if restaurant is not active
    #     if not restaurant.is_active:
    #         if self._restaurant_manager:
    #             check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)
    #         else:
    #             raise PermissionDeniedError(RestaurantManagerRole)
    #
    #
    #     return await uow.categories.list(fetch_items=fetch_items, **kwargs)

    async def create_instance(self, item: MenuCategoryCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuCategory:
        """
        Create a new menu category instance in the repository.

        Args:
            item (MenuCategoryCreateIn): The data to create the menu category.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuCategory: The created menu category instance.
        """

        # Permissions checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_is_email_verified(self._restaurant_manager)
        else:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check menu for existence
        if not await uow.menus.exists(item.menu_id):
            raise MenuNotFoundWithIdError(item.menu_id)

        # Get restaurant by menu
        restaurant = await uow.restaurants.retrieve_by_menu(item.menu_id)

        if not restaurant:
            raise RestaurantNotFoundWithIdError(restaurant.id)

        # Check if restaurant manager owns restaurant of Category to create
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, item.menu_id, uow)

        # Create
        data = item.model_dump()
        return await uow.categories.create(data, **kwargs)

    async def update_instance(self, id: int, item: MenuCategoryUpdateIn,
                              uow: SqlAlchemyUnitOfWork,
                              **kwargs) -> MenuCategory:
        """
        Update a menu category instance by its ID in the repository.

        Args:
            id (int): The ID of the menu category to update.
            item (MenuCategoryUpdateIn): The updated instance data.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuCategory: The updated menu category instance.
        """

        # Permissions checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_is_email_verified(self._restaurant_manager)
        else:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check category for existence
        if not await uow.categories.exists(id):
            raise MenuCategoryNotFoundWithIdError(id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(id)

        if not restaurant:
            raise RestaurantNotFoundWithIdError(restaurant.id)

        # Check if restaurant manager owns restaurant of Category to update
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # retrieved_menu_category = await self.retrieve_instance(id, uow)
        #
        # await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, retrieved_menu_category.menu_id, uow)

        # Update
        data = item.model_dump()
        return await uow.categories.update(id, data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a menu category instance by its ID from the repository.

        Args:
            id (int): The ID of the menu category to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        # Permissions checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_is_email_verified(self._restaurant_manager)
        else:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check category for existence
        if not await uow.categories.exists(id):
            raise MenuCategoryNotFoundWithIdError(id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(id)

        if not restaurant:
            raise RestaurantNotFoundWithIdError(restaurant.id)

        # Check if restaurant manager owns restaurant of Category to delete
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)
        # retrieved_menu_category = await self.retrieve_instance(id, uow)
        # await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, retrieved_menu_category.menu_id, uow)

        # Delete
        await uow.categories.delete(id, **kwargs)

    async def retrieve(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuCategoryRetrieveOut:
        """
        Retrieve a menu category schema by its ID.

        Args:
            id (int): The ID of the menu category to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuCategoryRetrieveOut: The retrieved menu category schema.
        """

        return await super().retrieve(id, uow, fetch_items=True, **kwargs)

    # async def list(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[MenuCategoryRetrieveOut]:
    #     """
    #     List all menu category schemas.
    #
    #     Args:
    #         uow (SqlAlchemyUnitOfWork): The unit of work instance.
    #
    #     Returns:
    #         List[MenuCategoryRetrieveOut]: List of menu category schemas.
    #     """
    #
    #     return await super().list(uow, fetch_items=True, **kwargs)

    async def add_menu_item(self, category_id: int, item_id: int,
                            uow: SqlAlchemyUnitOfWork,
                            **kwargs):
        """
        Adds a menu item to a menu category by their IDs.

        Args:
            category_id (int): ID of the menu category.
            item_id (int): ID of the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        # Permissions checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_is_email_verified(self._restaurant_manager)
        else:
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        item = await uow.items.retrieve(item_id)

        if not item:
            raise MenuItemNotFoundWithIdError(item_id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Get menu category
        menu_category = await uow.categories.retrieve(category_id, fetch_items=True)

        if not menu_category:
            raise MenuCategoryNotFoundWithIdError(category_id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(category_id)

        # ????? Remove ????
        if not restaurant:
            raise RestaurantNotFoundWithIdError(restaurant.id)

        # Check if restaurant manager owns restaurant of a Category
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # category = await self.retrieve_instance(category_id, uow, fetch_items=True)
        # await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, category.menu_id, uow)

        # Append
        if item in menu_category.items:
            raise MenuItemAlreadyInCategoryError(category_id)

        menu_category.items.add(item)

    async def remove_menu_item(self, category_id: int, item_id: int,
                               uow: SqlAlchemyUnitOfWork,
                               **kwargs):
        """
        Removes a menu item from a menu category by their IDs.

        Args:
            category_id (int): ID of the menu category.
            item_id (int): ID of the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Item

        item = await uow.items.retrieve(item_id)

        if not item:
            raise MenuItemNotFoundWithIdError(item_id)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Check if restaurant manager owns Category

        category = await self.retrieve_instance(category_id, uow, fetch_items=True)

        await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, category.menu_id, uow)

        # Remove

        if item not in category.items:
            raise MenuItemNotInCategoryError(category_id)

        category.items.remove(item)

    # @multimethod
    # async def add_menu_item(self, category_id: int,
    #                         item: MenuItem,
    #                         uow: SqlAlchemyUnitOfWork,
    #                         **kwargs):
    #     """
    #     Adds a menu item to a menu category by category ID and menu item instance.
    #
    #     Args:
    #         category_id (int): ID of the menu category.
    #         item (MenuItem): The menu item instance to add.
    #         uow (SqlAlchemyUnitOfWork): The unit of work instance.
    #         **kwargs: Additional keyword arguments.
    #     """
    #
    #     check_restaurant_manager_is_active(self._restaurant_manager)
    #
    #     # Check if restaurant manager owns Item
    #
    #     check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)
    #
    #     # Check if restaurant manager owns Category
    #
    #     category = await self.retrieve_instance(category_id, uow, fetch_items=True)
    #
    #     await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, category.menu_id, uow)
    #
    #     # Append
    #
    #     if item in category.items:
    #         raise MenuItemAlreadyInCategoryError(category_id)
    #
    #     category.items.add(item)
