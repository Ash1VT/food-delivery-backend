from typing import Optional, List
from loguru import logger

from models import RestaurantManager, Menu
from exceptions.menu import MenuNotFoundWithIdError
from exceptions.restaurant import RestaurantNotFoundWithIdError, RestaurantNotActiveError, \
    RestaurantMissingCurrentMenuError
from exceptions.permissions import PermissionDeniedError
from user_roles import RestaurantManagerRole
from schemas.menu import MenuRetrieveOut, MenuCreateIn, MenuCreateOut, MenuUpdateIn, MenuUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_ownership_on_restaurant
from .mixins import CreateMixin, UpdateMixin, DeleteMixin

__all__ = [
    'MenuService',
]


class MenuService(CreateMixin[Menu, MenuCreateIn, MenuCreateOut],
                  UpdateMixin[Menu, MenuUpdateIn, MenuUpdateOut],
                  DeleteMixin[Menu]):
    """
    Service class for managing menus.

    This class provides methods for creating, updating, and deleting menu instances.
    It also supports retrieving current menu of a restaurant and listing restaurant menus.

    Attributes:
        schema_create_out (MenuCreateOut): The schema for output representation of created instances.
        schema_update_out (MenuUpdateOut): The schema for output representation of updated instances.
    """

    schema_create_out = MenuCreateOut
    schema_update_out = MenuUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the MenuService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def create_instance(self, item: MenuCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Menu:
        """
        Create a new menu instance in the repository.

        Args:
            item (MenuCreateIn): The data to create the menu.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Menu: The created menu instance.

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

        # Check if restaurant manager owns restaurant of a menu to create
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Create
        data = item.model_dump()
        menu = await uow.menus.create(data, **kwargs)

        logger.info(f"Created Menu with id={menu.id}")

        return menu

    async def update_instance(self, id: int, item: MenuUpdateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Menu:
        """
        Update a menu instance by its ID in the repository.

        Args:
            id (int): The ID of the menu to update.
            item (MenuUpdateIn): The updated instance data.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Menu: The updated menu instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuNotFoundWithIdError: If the menu is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu
        menu = await uow.menus.retrieve(id)

        if not menu:
            logger.warning(f"Menu with id={id} not found")
            raise MenuNotFoundWithIdError(id)

        # Check if restaurant manager owns restaurant of a menu
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu.restaurant_id)

        # Update
        data = item.model_dump()
        menu = await uow.menus.update(id, data, **kwargs)

        logger.info(f"Updated Menu with id={menu.id}")

        return menu

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a menu instance by its ID from the repository.

        Args:
            id (int): The ID of the menu to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            MenuNotFoundWithIdError: If the menu is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Get menu
        menu = await uow.menus.retrieve(id)

        if not menu:
            logger.warning(f"Menu with id={id} not found")
            raise MenuNotFoundWithIdError(id)

        # Check if restaurant manager owns restaurant of a menu
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu.restaurant_id)

        # Delete
        await uow.menus.delete(id, **kwargs)

        logger.info(f"Deleted Menu with id={id}")

    async def retrieve_current_restaurant_menu_instance(self, restaurant_id: int, uow: SqlAlchemyUnitOfWork,
                                                        **kwargs) -> Optional[Menu]:
        """
        Retrieve a current menu instance of a restaurant by its ID from the repository.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Menu: The retrieved current menu instance.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant is not found.
            RestaurantNotActiveError: If the restaurant is not active.
            CurrentMenuMissingError: If there is no current menu
        """

        # Get restaurant
        restaurant = await uow.restaurants.retrieve(restaurant_id)

        if not restaurant:
            logger.warning(f"Restaurant with id={restaurant_id} not found")
            raise RestaurantNotFoundWithIdError(restaurant_id)

        # Permission checks if restaurant is not active
        if not restaurant.is_active:
            if self._restaurant_manager:
                check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)
            else:
                logger.warning(f"Restaurant with id={restaurant_id} is not active")
                raise RestaurantNotActiveError(restaurant_id)

        # Get current menu
        current_menu = await uow.menus.retrieve_current_restaurant_menu(restaurant_id,
                                                                        fetch_categories=True,
                                                                        **kwargs)

        # if not current_menu:
        #     logger.warning(f"Current Menu for Restaurant with id={restaurant_id} not found")
        #     raise RestaurantMissingCurrentMenuError(restaurant_id)

        logger.info(f"Retrieved Current Menu for Restaurant with id={restaurant_id}")

        return current_menu

    async def list_restaurant_menus_instances(self, restaurant_id: int,
                                              uow: SqlAlchemyUnitOfWork,
                                              **kwargs) -> List[Menu]:
        """
        List all menu instances which belong to restaurant from the repository.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[Menu]: List of menu instances.

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

        # Check if restaurant manager owns restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # List
        menus = await uow.menus.list_restaurant_menus(restaurant_id, fetch_categories=True, **kwargs)

        logger.info(f"Retrieved list of Menu for Restaurant with id={restaurant_id}")

        return menus

    async def retrieve_current_restaurant_menu(self, restaurant_id: int,
                                               uow: SqlAlchemyUnitOfWork, **kwargs) -> Optional[MenuRetrieveOut]:
        """
        Retrieve a current menu schema restaurant's ID with associated categories.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            MenuRetrieveOut: The retrieved current menu schema with associated categories.
        """

        retrieved_instance = await self.retrieve_current_restaurant_menu_instance(restaurant_id, uow, **kwargs)
        if retrieved_instance:
            return MenuRetrieveOut.model_validate(retrieved_instance)

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

        instance_list = await self.list_restaurant_menus_instances(restaurant_id, uow, **kwargs)
        return [MenuRetrieveOut.model_validate(instance) for instance in instance_list]
