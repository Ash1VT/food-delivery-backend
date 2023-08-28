from typing import Optional, List

from multimethod import multimethod

from exceptions import RestaurantAlreadyExistsWithIdError, RestaurantNotFoundWithIdError
from models import Restaurant, RestaurantManager, Menu
from schemas import RestaurantRetrieveOut, RestaurantRetrieveForManagerOut, RestaurantRetrieveForUserOut, \
    RestaurantCreateIn, RestaurantCreateOut
from utils import check_restaurant_manager_ownership, check_restaurant_manager_is_active
from uow import SqlAlchemyUnitOfWork
from .mixins import RetrieveMixin, ListMixin, CreateMixin, DeleteMixin
from .menu import MenuService


class RestaurantService(RetrieveMixin[Restaurant, RestaurantRetrieveOut],
                        ListMixin[Restaurant, RestaurantRetrieveOut],
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

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork,
                                fetch_menus: bool = False,
                                fetch_current_menu: bool = False, **kwargs) -> Restaurant:
        """
        Retrieve a restaurant instance by its ID from the repository.

        Args:
            id (int): The ID of the restaurant to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_menus (bool): Whether to fetch associated menus.
            fetch_current_menu (bool): Whether to fetch the current menu.

        Returns:
            Restaurant: The retrieved restaurant instance.
        """

        retrieved_instance = await uow.restaurants.retrieve(id, fetch_menus=fetch_menus,
                                                            fetch_current_menu=fetch_current_menu, **kwargs)

        if not retrieved_instance:
            raise RestaurantNotFoundWithIdError(id)

        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork,
                             fetch_menus: bool = False,
                             fetch_current_menu: bool = False, **kwargs) -> List[Restaurant]:
        """
        List all restaurant instances from the repository.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            fetch_menus (bool): Whether to fetch associated menus.
            fetch_current_menu (bool): Whether to fetch the current menu.

        Returns:
            List[Restaurant]: List of restaurant instances.
        """

        return await uow.restaurants.list(fetch_menus=fetch_menus, fetch_current_menu=fetch_current_menu, **kwargs)

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

    def get_retrieve_schema(self, instance: Restaurant) -> RestaurantRetrieveOut:
        """
        Get the schema for output representation of a retrieved restaurant instance.

        Args:
            instance (Restaurant): The restaurant instance.

        Returns:
            RestaurantRetrieveOut: The schema for output representation of the instance.
        """

        if self._restaurant_manager and instance.id == self._restaurant_manager.restaurant_id:
            return RestaurantRetrieveForManagerOut.model_validate(instance)
        return RestaurantRetrieveForUserOut.model_validate(instance)

    def get_list_schema(self, instance_list: List[Restaurant]) -> List[RestaurantRetrieveOut]:
        """
        Get the schema for output representation of a list of restaurant instances.

        Args:
            instance_list (List[Restaurant]): List of restaurant instances.

        Returns:
            List[RestaurantRetrieveOut]: List of schemas for output representation of instances.
        """

        return [RestaurantRetrieveForUserOut.model_validate(instance) for instance in instance_list]

    async def retrieve(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> RestaurantRetrieveOut:
        """
        Retrieve a restaurant by its ID with associated menus.

        Args:
            id (int): The ID of the menu to retrieve.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            RestaurantRetrieveOut: The retrieved restaurant schema with associated menus.
        """

        if self._restaurant_manager and id == self._restaurant_manager.restaurant_id:
            return await super().retrieve(id, uow, fetch_menus=True, **kwargs)
        return await super().retrieve(id, uow, fetch_current_menu=True, **kwargs)

    async def list(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[RestaurantRetrieveOut]:
        """
        List all restaurants with associated menus.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            List[RestaurantRetrieveOut]: List of menu restaurant schemas with associated menus.
        """

        return await super().list(uow, fetch_current_menu=True, **kwargs)

    @multimethod
    async def add_menu(self, restaurant_id: int, menu_id: int,
                       menu_service: MenuService,
                       uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Adds a menu to a restaurant by their IDs.

        Args:
            restaurant_id (int): ID of the restaurant.
            menu_id (int): ID of the menu.
            menu_service (MenuService): The menu service instance.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        restaurant = await self.retrieve_instance(restaurant_id, uow, fetch_menus=True)
        menu = await menu_service.retrieve_instance(menu_id, uow)

        check_restaurant_manager_is_active(self._restaurant_manager)
        check_restaurant_manager_ownership(self._restaurant_manager, restaurant_id)
        check_restaurant_manager_ownership(self._restaurant_manager, menu.restaurant_id)

        restaurant.menus.append(menu)

    @multimethod
    async def add_menu(self, restaurant_id: int,
                       menu: Menu,
                       uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Adds a menu to a restaurant by restaurant ID and menu instance.

        Args:
            restaurant_id (int): ID of the restaurant.
            menu (Menu): The menu instance.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        restaurant = await self.retrieve_instance(restaurant_id, uow, fetch_menus=True)

        check_restaurant_manager_is_active(self._restaurant_manager)
        check_restaurant_manager_ownership(self._restaurant_manager, restaurant_id)
        check_restaurant_manager_ownership(self._restaurant_manager, menu.restaurant_id)

        restaurant.menus.append(menu)

    @multimethod
    async def set_current_menu(self, restaurant_id: int, menu_id: int,
                               menu_service: MenuService,
                               uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Sets a menu as a current menu of a restaurant by their IDs.

        Args:
            restaurant_id (int): ID of the restaurant.
            menu_id (int): ID of the menu.
            menu_service (MenuService): The menu service instance.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
            **kwargs: Additional keyword arguments.
        """

        restaurant = await self.retrieve_instance(restaurant_id, uow, fetch_current_menu=True)
        menu = await menu_service.retrieve_instance(menu_id, uow)

        check_restaurant_manager_is_active(self._restaurant_manager)
        check_restaurant_manager_ownership(self._restaurant_manager, restaurant_id)
        check_restaurant_manager_ownership(self._restaurant_manager, menu.restaurant_id)

        restaurant.current_menu = menu

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

        restaurant = await self.retrieve_instance(restaurant_id, uow, fetch_current_menu=True)

        check_restaurant_manager_is_active(self._restaurant_manager)
        check_restaurant_manager_ownership(self._restaurant_manager, restaurant_id)
        check_restaurant_manager_ownership(self._restaurant_manager, menu.restaurant_id)

        restaurant.current_menu = menu
