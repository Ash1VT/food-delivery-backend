from typing import Optional

from fastapi import UploadFile
from loguru import logger

from config import get_settings
from exceptions.menu import MenuNotFoundWithIdError
from exceptions.category import MenuCategoryNotFoundWithIdError
from exceptions.item import MenuItemNotFoundWithIdError, MenuItemAlreadyInCategoryError, MenuItemNotInCategoryError
from exceptions.permissions import PermissionDeniedError
from models import RestaurantManager, MenuCategory
from user_roles import RestaurantManagerRole
from schemas.category import MenuCategoryCreateIn, MenuCategoryUpdateIn, MenuCategoryCreateOut, MenuCategoryUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_ownership_on_restaurant
from utils.firebase import upload_menu_category_image_to_firebase
from .mixins import CreateMixin, UpdateMixin, DeleteMixin

__all__ = [
    'MenuCategoryService'
]


class MenuCategoryService(CreateMixin[MenuCategory, MenuCategoryCreateIn, MenuCategoryCreateOut],
                          UpdateMixin[MenuCategory, MenuCategoryUpdateIn, MenuCategoryUpdateOut],
                          DeleteMixin[MenuCategory]):
    """
    Service class for managing menu categories.

    This class provides methods for creating, updating, and deleting menu categories.
    It also supports adding menu items to menu categories and removing them.

    Attributes:
        schema_create_out (MenuCategoryCreateOut): The schema for output representation of created instances.
        schema_update_out (MenuCategoryUpdateOut): The schema for output representation of updated instances.
    """

    schema_create_out = MenuCategoryCreateOut
    schema_update_out = MenuCategoryUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the MenuCategoryService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def create_instance(self, item: MenuCategoryCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuCategory:
        """
        Create a new menu category instance in the repository.

        Args:
            item (MenuCategoryCreateIn): The data to create the menu category.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuCategory: The created menu category instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuNotFoundWithIdError: If the menu is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check menu for existence
        if not await uow.menus.exists(item.menu_id):
            logger.warning(f"Menu with id={item.menu_id} not found")
            raise MenuNotFoundWithIdError(item.menu_id)

        # Get restaurant by menu
        restaurant = await uow.restaurants.retrieve_by_menu(item.menu_id)

        # Check if restaurant manager owns restaurant of menu category to create
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Create
        data = item.model_dump()
        settings = get_settings()
        data['image_url'] = settings.default_menu_category_image_url
        menu_category = await uow.categories.create(data, **kwargs)

        logger.info(f"Created MenuCategory with id={menu_category.id}")

        return menu_category

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

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuCategoryNotFoundWithIdError: If the menu category is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check category for existence
        if not await uow.categories.exists(id):
            logger.warning(f"MenuCategory with id={id} not found")
            raise MenuCategoryNotFoundWithIdError(id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(id)

        # Check if restaurant manager owns restaurant of Category to update
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Update
        data = item.model_dump()
        menu_category = await uow.categories.update(id, data, **kwargs)

        logger.info(f"Updated MenuCategory with id={menu_category.id}")

        return menu_category

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a menu category instance by its ID from the repository.

        Args:
            id (int): The ID of the menu category to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuCategoryNotFoundWithIdError: If the menu category is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check category for existence
        if not await uow.categories.exists(id):
            logger.warning(f"MenuCategory with id={id} not found")
            raise MenuCategoryNotFoundWithIdError(id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(id)

        # Check if restaurant manager owns restaurant of Category to delete
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Delete
        await uow.categories.delete(id, **kwargs)
        logger.info(f"Deleted MenuCategory with id={id}")

    async def add_menu_item(self, category_id: int, item_id: int,
                            uow: SqlAlchemyUnitOfWork,
                            **kwargs):
        """
        Adds a menu item to a menu category by their IDs.

        Args:
            category_id (int): ID of the menu category.
            item_id (int): ID of the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuItemNotFoundWithIdError: If the menu item is not found.
            MenuCategoryNotFoundWithIdError: If the menu category is not found.
            MenuItemAlreadyInCategoryError: If the menu item is already in the menu category.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        menu_item = await uow.items.retrieve(item_id)

        if not menu_item:
            logger.warning(f"MenuItem with id={item_id} not found")
            raise MenuItemNotFoundWithIdError(item_id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu_item.restaurant_id)

        # Get menu category
        menu_category = await uow.categories.retrieve(category_id, fetch_items=True)

        if not menu_category:
            logger.warning(f"MenuCategory with id={category_id} not found")
            raise MenuCategoryNotFoundWithIdError(category_id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(category_id)

        # Check if restaurant manager owns restaurant of a menu category
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Check if menu item is already in menu category
        if menu_item in menu_category.items:
            logger.warning(f"MenuItem with id={item_id} is already in MenuCategory with id={category_id}")
            raise MenuItemAlreadyInCategoryError(category_id)

        # Append
        menu_category.items.add(menu_item)

        logger.info(f"Added MenuItem with id={item_id} to MenuCategory with id={category_id}")

    async def remove_menu_item(self, category_id: int, item_id: int,
                               uow: SqlAlchemyUnitOfWork,
                               **kwargs):
        """
        Removes a menu item from a menu category by their IDs.

        Args:
            category_id (int): ID of the menu category.
            item_id (int): ID of the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuItemNotFoundWithIdError: If the menu item is not found.
            MenuCategoryNotFoundWithIdError: If the menu category is not found.
            MenuItemNotInCategoryError: If the menu item is not in the menu category.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        item = await uow.items.retrieve(item_id)

        if not item:
            logger.warning(f"MenuItem with id={item_id} not found")
            raise MenuItemNotFoundWithIdError(item_id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Get menu category
        menu_category = await uow.categories.retrieve(category_id, fetch_items=True)

        if not menu_category:
            logger.warning(f"MenuCategory with id={category_id} not found")
            raise MenuCategoryNotFoundWithIdError(category_id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(category_id)

        # Check if restaurant manager owns restaurant of a menu category
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Check if menu item is not already in menu category
        if item not in menu_category.items:
            logger.warning(f"MenuItem with id={item_id} is not in MenuCategory with id={category_id}")
            raise MenuItemNotInCategoryError(category_id)

        # Remove
        menu_category.items.remove(item)

        logger.info(f"Removed MenuItem with id={item_id} from MenuCategory with id={category_id}")

    async def upload_image(self, id: int, image: UploadFile, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuCategoryUpdateOut:

        # Permission checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check category for existence
        menu_category = await uow.categories.retrieve(id)

        if not menu_category:
            logger.warning(f"MenuCategory with id={id} not found")
            raise MenuCategoryNotFoundWithIdError(id)

        # Get restaurant by category
        restaurant = await uow.restaurants.retrieve_by_category(id)

        # Check if restaurant manager owns a menu category
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Get image url
        image_url = upload_menu_category_image_to_firebase(menu_category, image.file)

        # Upload image
        updated_menu_category = await uow.categories.update(id, {
            'image_url': image_url
        })

        logger.info(f"Uploaded image for MenuCategory with id={id}")

        return self.schema_update_out.model_validate(updated_menu_category)
