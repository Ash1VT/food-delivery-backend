from abc import ABC, abstractmethod
from typing import TypeVar, Generic

import pytest

from collections import Counter

from sqlalchemy.exc import MissingGreenlet
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import MenuItem, MenuCategory, Menu, Restaurant, RestaurantManager
from src.repositories import MenuItemRepository, MenuCategoryRepository, MenuRepository, RestaurantRepository, \
    RestaurantManagerRepository
from .factories import MenuItemFactory, MenuCategoryFactory, MenuFactory, RestaurantFactory, RestaurantManagerFactory
from .utils.item import validate_menu_item, compare_menu_items, \
    generate_menu_item_create_data, generate_menu_item_update_data
from .utils.category import validate_menu_category, compare_menu_categories, \
    generate_menu_category_create_data, generate_menu_category_update_data
from .utils.menu import validate_menu, compare_menus, generate_menu_create_data, generate_menu_update_data
from .utils.restaurant import validate_restaurant, compare_restaurants, \
    generate_restaurant_create_data, generate_restaurant_update_data
from .utils.manager import validate_restaurant_manager, compare_restaurant_managers, \
    generate_restaurant_manager_create_data, generate_restaurant_manager_update_data

Model = TypeVar('Model')
Repository = TypeVar('Repository')


class BaseTestRepository(Generic[Model, Repository], ABC):
    factory = None
    repository_class: Repository = None

    @abstractmethod
    def compare_instances(self, instance_1: Model, instance_2: Model) -> bool:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    @abstractmethod
    async def generate_instance_create_data(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def generate_instance_update_data(self) -> dict:
        raise NotImplementedError

    @pytest.fixture(scope='function')
    def repository(self, session: AsyncSession) -> Repository:
        return self.repository_class(session=session)

    async def test_retrieve(self, repository: Repository):
        instance = await self.factory.create()
        retrieved_instance = await repository.retrieve(id=instance.id)
        assert self.compare_instances(instance, retrieved_instance)

    async def test_retrieve_nonexistent(self, repository: Repository):
        instance = await repository.retrieve(id=0)
        assert instance is None

    async def test_list(self, repository: Repository):
        instance_list = await self.factory.create_batch(size=4)
        retrieved_instance_list = await repository.list()

        assert all((self.compare_instances(instance, retrieved_instance)
                    for instance, retrieved_instance in zip(instance_list, retrieved_instance_list)))

    async def test_create(self, repository: Repository):
        create_data = await self.generate_instance_create_data()
        created_instance = await repository.create(data=create_data)

        assert self.validate_instance(created_instance, create_data)

    async def test_update(self, repository: Repository):
        instance = await self.factory.create()
        update_data = self.generate_instance_update_data()
        updated_instance = await repository.update(id=instance.id, data=update_data)

        assert self.validate_instance(updated_instance, update_data)

    async def test_update_nonexistent(self, repository: Repository):
        update_data = self.generate_instance_update_data()
        updated_instance = await repository.update(id=0, data=update_data)

        assert updated_instance is None

    async def test_delete(self, repository: Repository):
        instance = await self.factory.create()
        await repository.delete(id=instance.id)

        retrieved_instance = await repository.retrieve(id=instance.id)
        assert not retrieved_instance

    async def test_delete_nonexistent(self, repository: Repository):
        await repository.delete(id=0)


class TestMenuItemRepository(BaseTestRepository[MenuItem, MenuItemRepository]):
    factory = MenuItemFactory
    repository_class = MenuItemRepository

    def compare_instances(self, instance_1: MenuItem, instance_2: MenuItem) -> bool:
        return compare_menu_items(instance_1, instance_2)

    def validate_instance(self, instance: MenuItem, data: dict) -> bool:
        return validate_menu_item(instance, data)

    async def generate_instance_create_data(self) -> dict:
        return await generate_menu_item_create_data()

    def generate_instance_update_data(self) -> dict:
        return generate_menu_item_update_data()

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, session: AsyncSession):
        MenuItemFactory._meta.sqlalchemy_session = session
        RestaurantFactory._meta.sqlalchemy_session = session


class TestMenuCategoryRepository(BaseTestRepository[MenuCategory, MenuCategoryRepository]):
    factory = MenuCategoryFactory
    repository_class = MenuCategoryRepository

    def compare_instances(self, instance_1: MenuCategory, instance_2: MenuCategory) -> bool:
        return compare_menu_categories(instance_1, instance_2)

    def validate_instance(self, instance: MenuCategory, data: dict) -> bool:
        return validate_menu_category(instance, data)

    async def generate_instance_create_data(self) -> dict:
        return await generate_menu_category_create_data()

    def generate_instance_update_data(self) -> dict:
        return generate_menu_category_update_data()

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, session: AsyncSession):
        MenuCategoryFactory._meta.sqlalchemy_session = session
        RestaurantFactory._meta.sqlalchemy_session = session

    async def test_retrieve_fetch_items(self, repository: MenuCategoryRepository):
        menu_category = await MenuCategoryFactory.create()
        menu_category_db = await repository.retrieve(id=menu_category.id, fetch_items=True)

        assert menu_category == menu_category_db

        _ = menu_category_db.items

    async def test_list_fetch_items(self, repository: MenuCategoryRepository):
        menu_categories_list = await MenuCategoryFactory.create_batch(size=4)
        menu_category_list_db = await repository.list(fetch_items=True)

        assert Counter(menu_categories_list) == Counter(menu_category_list_db)

        for menu_category in menu_category_list_db:
            _ = menu_category.items


class TestMenuRepository(BaseTestRepository[Menu, MenuRepository]):
    factory = MenuFactory
    repository_class = MenuRepository

    def compare_instances(self, instance_1: Menu, instance_2: Menu) -> bool:
        return compare_menus(instance_1, instance_2)

    def validate_instance(self, instance: Menu, data: dict) -> bool:
        return validate_menu(instance, data)

    async def generate_instance_create_data(self) -> dict:
        return await generate_menu_create_data()

    def generate_instance_update_data(self) -> dict:
        return generate_menu_update_data()

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, session: AsyncSession):
        MenuFactory._meta.sqlalchemy_session = session
        RestaurantFactory._meta.sqlalchemy_session = session

    async def test_retrieve_fetch_categories(self, repository: MenuRepository):
        menu = await MenuFactory.create()
        menu_db = await repository.retrieve(id=menu.id, fetch_categories=True)

        assert menu == menu_db

        _ = menu_db.categories

    async def test_list_fetch_categories(self, repository: MenuRepository):
        menus_list = await MenuFactory.create_batch(size=4)
        menus_list_db = await repository.list(fetch_categories=True)

        assert Counter(menus_list) == Counter(menus_list_db)

        for menu in menus_list_db:
            _ = menu.categories


class TestRestaurantRepository(BaseTestRepository[Restaurant, RestaurantRepository]):
    factory = RestaurantFactory
    repository_class = RestaurantRepository

    def compare_instances(self, instance_1: Restaurant, instance_2: Restaurant) -> bool:
        return compare_restaurants(instance_1, instance_2)

    def validate_instance(self, instance: Restaurant, data: dict) -> bool:
        return validate_restaurant(instance, data)

    async def generate_instance_create_data(self) -> dict:
        return await generate_restaurant_create_data()

    def generate_instance_update_data(self) -> dict:
        return generate_restaurant_update_data()

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, session: AsyncSession):
        RestaurantFactory._meta.sqlalchemy_session = session

    async def test_retrieve_fetch_menus(self, repository: RestaurantRepository):
        restaurant = await RestaurantFactory.create()
        restaurant_db = await repository.retrieve(id=restaurant.id, fetch_menus=True)

        assert restaurant == restaurant_db

        _ = restaurant_db.menus

    async def test_retrieve_fetch_current_menu(self, repository: RestaurantRepository):
        restaurant = await RestaurantFactory.create()
        restaurant_db = await repository.retrieve(id=restaurant.id, fetch_current_menu=True)

        assert restaurant == restaurant_db

        _ = restaurant_db.current_menu

        with pytest.raises(MissingGreenlet):
            _ = restaurant_db.menus

    async def test_retrieve_fetch_all(self, repository: RestaurantRepository):
        restaurant = await RestaurantFactory.create()
        restaurant_db = await repository.retrieve(id=restaurant.id, fetch_menus=True, fetch_current_menu=True)

        assert restaurant == restaurant_db

        _ = restaurant_db.menus
        _ = restaurant_db.current_menu

    async def test_list_fetch_menus(self, repository: RestaurantRepository):
        restaurant_list = await RestaurantFactory.create_batch(size=4)
        restaurant_list_db = await repository.list(fetch_menus=True)

        assert Counter(restaurant_list) == Counter(restaurant_list_db)

        for restaurant in restaurant_list_db:
            _ = restaurant.menus

    async def test_list_fetch_current_menu(self, repository: RestaurantRepository):
        restaurant_list = await RestaurantFactory.create_batch(size=4)
        restaurant_list_db = await repository.list(fetch_current_menu=True)

        assert Counter(restaurant_list) == Counter(restaurant_list_db)

        for restaurant in restaurant_list_db:
            _ = restaurant.current_menu
            with pytest.raises(MissingGreenlet):
                _ = restaurant.menus

    async def test_list_fetch_all(self, repository: RestaurantRepository):
        restaurant_list = await RestaurantFactory.create_batch(size=4)
        restaurant_list_db = await repository.list(fetch_menus=True, fetch_current_menu=True)

        assert Counter(restaurant_list) == Counter(restaurant_list_db)

        for restaurant in restaurant_list_db:
            _ = restaurant.menus
            _ = restaurant.current_menu


class TestRestaurantManagerRepository(BaseTestRepository[RestaurantManager, RestaurantManagerRepository]):
    factory = RestaurantManagerFactory
    repository_class = RestaurantManagerRepository

    def compare_instances(self, instance_1: RestaurantManager, instance_2: RestaurantManager) -> bool:
        return compare_restaurant_managers(instance_1, instance_2)

    def validate_instance(self, instance: RestaurantManager, data: dict) -> bool:
        return validate_restaurant_manager(instance, data)

    async def generate_instance_create_data(self) -> dict:
        return await generate_restaurant_manager_create_data()

    def generate_instance_update_data(self) -> dict:
        return generate_restaurant_manager_update_data()

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, session: AsyncSession):
        RestaurantManagerFactory._meta.sqlalchemy_session = session
        RestaurantFactory._meta.sqlalchemy_session = session
