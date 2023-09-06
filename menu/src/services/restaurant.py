from typing import Optional, List

from multimethod import multimethod

from exceptions import RestaurantAlreadyExistsWithIdError, RestaurantNotFoundWithIdError, MenuNotFoundWithIdError
from models import Restaurant, RestaurantManager, Menu
from schemas import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantCreateOut
from utils import check_restaurant_manager_ownership_on_restaurant, check_restaurant_manager_is_active, \
    check_restaurant_manager_ownership_on_menu
from uow import SqlAlchemyUnitOfWork
from .mixins import RetrieveMixin, ListMixin, CreateMixin, DeleteMixin


class RestaurantService(RetrieveMixin[Restaurant, RestaurantRetrieveOut],
                        CreateMixin[Restaurant, RestaurantCreateIn, RestaurantCreateOut],
                        DeleteMixin[Restaurant]):
    """
    Service class for managing restaurants.

    This class provides methods for retrieving, listing, creating, updating, and deleting restaurant instances.
    It also supports adding menus and setting the current menu of a restaurant.

    Attributes:
        schema_retrieve_out (RestaurantRetrieveOut): The schema for output representation of retrieved instances.
        schema_create_out (RestaurantCreateOut): The schema for output representation of created instances.
    """

    schema_retrieve_out = RestaurantRetrieveOut
    schema_create_out = RestaurantCreateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initialize the RestaurantService.

        Args:
            restaurant_manager (Optional[RestaurantManager]): The restaurant manager associated with the service.
        """

        self._restaurant_manager = restaurant_manager

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> Restaurant:
        """
        Retrieve a restaurant instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Restaurant: The retrieved restaurant instance.
        """

        retrieved_instance = await uow.restaurants.retrieve(id, **kwargs)

        if not retrieved_instance:
            raise RestaurantNotFoundWithIdError(id)

        return retrieved_instance

    async def create_instance(self, item: RestaurantCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Restaurant:
        """
        Create a new restaurant instance in the repository.

        Args:
            item (RestaurantCreateIn): The data to create the restaurant.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            Restaurant: The created restaurant instance.
        """

        if await uow.restaurants.exists(item.id):
            raise RestaurantAlreadyExistsWithIdError(item.id)

        data = item.model_dump()

        return await uow.restaurants.create(data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a restaurant instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        await uow.restaurants.delete(id, **kwargs)

    @multimethod
    async def set_current_menu(self, restaurant_id: int, menu_id: int,
                               uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Sets a menu as a current menu of a restaurant by their IDs.

        Args:
            restaurant_id (int): ID of the restaurant.
            menu_id (int): ID of the menu.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Restaurant

        restaurant = await self.retrieve_instance(restaurant_id, uow)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # Check if restaurant manager owns Menu

        await check_restaurant_manager_ownership_on_menu(self._restaurant_manager, menu_id, uow)

        # Set current menu

        restaurant.current_menu_id = menu_id

    @multimethod
    async def set_current_menu(self, restaurant_id: int,
                               menu: Menu,
                               uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Sets a menu as a current menu of a restaurant by restaurant ID and menu instance.

        Args:
            restaurant_id (int): ID of the restaurant.
            menu (Menu): The menu instance.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        check_restaurant_manager_is_active(self._restaurant_manager)

        # Check if restaurant manager owns Restaurant

        restaurant = await self.retrieve_instance(restaurant_id, uow)

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, restaurant_id)

        # Check if restaurant manager owns Menu

        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, menu.restaurant_id)

        # Set current menu

        restaurant.current_menu_id = menu.id
