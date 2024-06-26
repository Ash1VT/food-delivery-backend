from typing import Optional
from loguru import logger

from exceptions.restaurant import RestaurantNotFoundWithIdError, RestaurantAlreadyExistsWithIdError, \
    RestaurantMissingCurrentMenuError
from exceptions.manager import RestaurantManagerNotFoundWithIdError
from exceptions.menu import MenuNotFoundWithIdError
from exceptions.permissions import PermissionDeniedError
from models import Restaurant, RestaurantManager
from user_roles import RestaurantManagerRole
from schemas.restaurant import RestaurantCreateIn, RestaurantCreateOut, RestaurantUpdateIn, RestaurantUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_ownership_on_restaurant
from .mixins import CreateMixin, DeleteMixin, UpdateMixin

__all__ = [
    'RestaurantService',
]


class RestaurantService(CreateMixin[Restaurant, RestaurantCreateIn, RestaurantCreateOut],
                        UpdateMixin[Restaurant, RestaurantUpdateIn, RestaurantUpdateOut],
                        DeleteMixin[Restaurant]):
    """
    Service class for managing restaurants.

    This class provides methods for creating, updating, and deleting restaurant instances.
    It also supports setting the current menu of a restaurant.

    Attributes:
        schema_create_out (RestaurantCreateOut): The schema for output representation of created instances.
        schema_update_out (RestaurantUpdateOut): The schema for output representation of updated instances.
    """

    schema_create_out = RestaurantCreateOut
    schema_update_out = RestaurantUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the RestaurantService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def create_instance(self, item: RestaurantCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Restaurant:
        """
        Create a new restaurant instance in the repository.

        Args:
            item (RestaurantCreateIn): The data to create the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Restaurant: The created restaurant instance.

        Raises:
            RestaurantAlreadyExistsWithIdError: If the restaurant already exists with the given ID.
        """

        # Check if restaurant already exists
        if await uow.restaurants.exists(item.id):
            logger.warning(f"Restaurant with id={item.id} already exists")
            raise RestaurantAlreadyExistsWithIdError(item.id)

        # Check restaurant manager for existence
        restaurant_manager = await uow.managers.retrieve(item.restaurant_manager_id)

        if not restaurant_manager:
            logger.warning(f"RestaurantManager with id={item.restaurant_manager_id} not found")
            raise RestaurantManagerNotFoundWithIdError(item.restaurant_manager_id)

        # Create
        data = item.model_dump()
        del data['restaurant_manager_id']

        restaurant_instance = await uow.restaurants.create(data, **kwargs)

        logger.info(f"Created Restaurant with id={restaurant_instance.id}")

        # Set restaurant manager
        restaurant_manager.restaurant_id = restaurant_instance.id

        logger.info(f"Set RestaurantManager with id={restaurant_manager.id} to Restaurant with id={restaurant_instance.id}")

        return restaurant_instance

    async def update_instance(self, id: int, item: RestaurantUpdateIn, uow: SqlAlchemyUnitOfWork,
                              **kwargs) -> Restaurant:
        """
        Update a restaurant instance by its ID in the repository.

        Args:
            id (int): The ID of the restaurant to update.
            item (RestaurantUpdateIn): The data to update the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Restaurant: The updated restaurant instance.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant is not found.
        """

        # Check restaurant for existence
        if not await uow.restaurants.exists(id):
            logger.warning(f"Restaurant with id={id} not found")
            raise RestaurantNotFoundWithIdError(id)

        # Update
        data = item.model_dump()
        restaurant = await uow.restaurants.update(id, data, **kwargs)

        logger.info(f"Updated Restaurant with id={id}")

        return restaurant

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a restaurant instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            RestaurantNotFoundWithIdError: If the restaurant is not found.
        """

        # Check restaurant for existence
        if not await uow.restaurants.exists(id):
            logger.warning(f"Restaurant with id={id} not found")
            raise RestaurantNotFoundWithIdError(id)

        # Delete
        await uow.restaurants.delete(id, **kwargs)

        logger.info(f"Deleted Restaurant with id={id}")

    async def set_current_menu(self, restaurant_id: int, menu_id: int,
                               uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Sets a menu as a current menu of a restaurant by their IDs.

        Args:
            restaurant_id (int): ID of the restaurant.
            menu_id (int): ID of the menu.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant is not found.
            MenuNotFoundWithIdError: If the menu is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check restaurant for existence
        if not await uow.restaurants.exists(restaurant_id, **kwargs):
            logger.warning(f"Restaurant with id={restaurant_id} not found")
            raise RestaurantNotFoundWithIdError(restaurant_id)

        # Check if restaurant manager owns restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # Get restaurant of a menu (if restaurant not found, menu does not exist)
        restaurant = await uow.restaurants.retrieve_by_menu(menu_id, **kwargs)

        if not restaurant:
            logger.warning(f"Menu with id={menu_id} not found")
            raise MenuNotFoundWithIdError(menu_id)

        # Check if restaurant manager owns restaurant of a menu
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant.id)

        # Set current menu
        restaurant.current_menu_id = menu_id

        logger.info(f"Set current menu of Restaurant with id={restaurant_id} to Menu with id={menu_id}")

    async def unset_current_menu(self, restaurant_id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Unsets current menu of a restaurant by its IDs.

        Args:
            restaurant_id (int): ID of the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant is not found.
        """

        # Permissions checks
        if not self._restaurant_manager:
            logger.warning(f"User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check restaurant for existence
        restaurant = await uow.restaurants.retrieve(restaurant_id, **kwargs)

        if not restaurant:
            logger.warning(f"Restaurant with id={restaurant_id} not found")
            raise RestaurantNotFoundWithIdError(restaurant_id)

        # Check if restaurant manager owns restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # Set current menu
        if not restaurant.current_menu_id:
            logger.warning(f"Restaurant with id={restaurant_id} has no current menu")
            raise RestaurantMissingCurrentMenuError(restaurant_id)

        restaurant.current_menu_id = None

    # async def activate(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
    #     """
    #     Activates a restaurant by its ID.
    #
    #     Args:
    #         id (int): The ID of the restaurant.
    #         uow (SqlAlchemyUnitOfWork): The unit of work instance.
    #
    #     Raises:
    #         RestaurantNotFoundWithIdError: If the restaurant is not found.
    #     """
    #
    #     restaurant = await uow.restaurants.retrieve(id, **kwargs)
    #
    #     if not restaurant:
    #         raise RestaurantNotFoundWithIdError(id)
    #
    #     restaurant.is_active = True
    #
    # async def deactivate(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
    #     """
    #     Deactivates a restaurant by its ID.
    #
    #     Args:
    #         id (int): The ID of the restaurant.
    #         uow (SqlAlchemyUnitOfWork): The unit of work instance.
    #
    #     Raises:
    #         RestaurantNotFoundWithIdError: If the restaurant is not found.
    #     """
    #
    #     restaurant = await uow.restaurants.retrieve(id, **kwargs)
    #
    #     if not restaurant:
    #         raise RestaurantNotFoundWithIdError(id)
    #
    #     restaurant.is_active = False
