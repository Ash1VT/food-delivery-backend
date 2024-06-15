from typing import Optional, List

from fastapi import UploadFile
from loguru import logger

from config import get_settings
from models import RestaurantManager, MenuItem
from exceptions.item import MenuItemNotFoundWithIdError
from exceptions.restaurant import RestaurantNotFoundWithIdError
from exceptions.permissions import PermissionDeniedError
from producer import publisher
from producer.events import MenuItemCreatedEvent, MenuItemDeletedEvent, MenuItemUpdatedEvent
from user_roles import RestaurantManagerRole
from schemas.item import MenuItemRetrieveOut, MenuItemCreateIn, MenuItemCreateOut, MenuItemUpdateIn, MenuItemUpdateOut
from uow import SqlAlchemyUnitOfWork, GenericUnitOfWork
from utils import check_restaurant_manager_ownership_on_restaurant
from utils.firebase import upload_menu_item_image_to_firebase
from .mixins import CreateMixin, UpdateMixin, DeleteMixin, RetrieveMixin, Model

__all__ = [
    'MenuItemService',
]


class MenuItemService(RetrieveMixin[MenuItem, MenuItemRetrieveOut],
                      CreateMixin[MenuItem, MenuItemCreateIn, MenuItemCreateOut],
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

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> Model:
        """
        Retrieve a menu item instance by its ID from the repository.

        Args:
            id (int): The ID of the menu item to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuItemNotFoundWithIdError: If the menu item is not found.

        Returns:
            MenuItem: The retrieved menu item instance.
        """

        # Get menu item
        menu_item = await uow.items.retrieve(id)

        if not menu_item:
            logger.warning(f"MenuItem with id={id} not found")
            raise MenuItemNotFoundWithIdError(id)

        return menu_item

    async def create_instance(self, item: MenuItemCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItem:
        """
        Create a new menu item instance in the repository.

        Args:
            item (MenuItemCreateIn): The data to create the menu item.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuItem: The created menu item instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check restaurant for existence
        if not await uow.restaurants.exists(item.restaurant_id):
            logger.warning(f"Restaurant with id={item.restaurant_id} not found")
            raise RestaurantNotFoundWithIdError(item.restaurant_id)

        # Check if restaurant manager owns restaurant of a menu item to create
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Create
        data = item.model_dump()
        settings = get_settings()
        data['image_url'] = settings.default_menu_item_image_url
        created_item = await uow.items.create(data, **kwargs)

        logger.info(f"Created MenuItem with id={created_item.id}")

        publisher.publish(MenuItemCreatedEvent(
            id=created_item.id,
            name=created_item.name,
            image_url=created_item.image_url,
            price=created_item.price,
            restaurant_id=created_item.restaurant_id
        ))

        return created_item

    async def update_instance(self, id: int, item: MenuItemUpdateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItem:
        """
        Update a menu item instance by its ID in the repository.

        Args:
            id (int): The ID of the menu item to update.
            item (MenuItemUpdateIn): The updated instance data.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuItem: The updated menu item instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuItemNotFoundWithIdError: If the menu item is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        menu_item = await uow.items.retrieve(id)

        if not menu_item:
            logger.warning(f"MenuItem with id={id} not found")
            raise MenuItemNotFoundWithIdError(id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu_item.restaurant_id)

        # Update
        data = item.model_dump()
        updated_item = await uow.items.update(id, data, **kwargs)

        logger.info(f"Updated MenuItem with id={updated_item.id}")

        publisher.publish(MenuItemUpdatedEvent(
            id=updated_item.id,
            name=updated_item.name,
            image_url=updated_item.image_url,
            price=updated_item.price,
        ))

        return updated_item

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a menu item instance by its ID from the repository.

        Args:
            id (int): The ID of the menu item to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuItemNotFoundWithIdError: If the menu item is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu item
        menu_item = await uow.items.retrieve(id)

        if not menu_item:
            logger.warning(f"MenuItem with id={id} not found")
            raise MenuItemNotFoundWithIdError(id)

        # Check if restaurant manager owns restaurant of a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu_item.restaurant_id)

        # Delete
        await uow.items.delete(id, **kwargs)

        logger.info(f"Deleted MenuItem with id={id}")

        publisher.publish(
            MenuItemDeletedEvent(id=id)
        )

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

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check restaurant for existence
        if not await uow.restaurants.exists(restaurant_id):
            logger.warning(f"Restaurant with id={restaurant_id} not found")
            raise RestaurantNotFoundWithIdError(restaurant_id)

        # Check if restaurant manager owns Restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # List
        menu_items = await uow.items.list_restaurant_items(restaurant_id, **kwargs)
        logger.info(f"Retrieved list of MenuItem for Restaurant with id={restaurant_id}")
        return menu_items

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

    async def upload_image(self, id: int, image: UploadFile, uow: SqlAlchemyUnitOfWork, **kwargs) -> MenuItemUpdateOut:

        # Permission checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check for existence
        menu_item = await uow.items.retrieve(id)

        if not menu_item:
            logger.warning(f"MenuItem with id={id} not found")
            raise MenuItemNotFoundWithIdError(id)

        # Check if restaurant manager owns a menu item
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu_item.restaurant_id)

        # Get image url
        image_url = upload_menu_item_image_to_firebase(id, image)

        # Upload image
        updated_menu_item = await uow.items.update(id, {
            'image_url': image_url
        })

        logger.info(f"Uploaded image for MenuItem with id={id}")

        return self.schema_update_out.model_validate(updated_menu_item)
