from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Optional, Type
from contextlib import nullcontext as does_not_raise

import pytest

from .factories import MenuItemFactory, MenuCategoryFactory, MenuFactory, RestaurantFactory, RestaurantManagerFactory
from models import MenuItem, MenuCategory, Menu, Restaurant, RestaurantManager
from services import MenuItemService, MenuCategoryService, MenuService, RestaurantService, RestaurantManagerService
from uow import SqlAlchemyUnitOfWork
from exceptions import MenuCategoryNotFoundWithIdError, MenuItemNotFoundWithIdError, \
    RestaurantNotFoundWithIdError, MenuItemAlreadyInCategoryError, \
    RestaurantManagerOwnershipError, RestaurantMissingCurrentMenuError, MenuItemNotInCategoryError, PermissionDeniedError, \
    MenuNotFoundWithIdError, RestaurantNotActiveError, RestaurantManagerNotFoundWithIdError
from schemas.item import MenuItemRetrieveOut, MenuItemCreateIn, MenuItemCreateOut, \
    MenuItemUpdateIn, MenuItemUpdateOut
from schemas.category import MenuCategoryRetrieveOut, MenuCategoryCreateIn, \
    MenuCategoryCreateOut, MenuCategoryUpdateIn, MenuCategoryUpdateOut
from schemas.menu import MenuRetrieveOut, MenuCreateIn, MenuCreateOut, MenuUpdateIn, MenuUpdateOut
from schemas.restaurant import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantCreateOut
from schemas.manager import RestaurantManagerRetrieveOut, RestaurantManagerCreateIn, RestaurantManagerCreateOut

from .data.item import validate_menu_item, compare_menu_items, \
    generate_menu_item_create_data, generate_menu_item_create_data_nonexistent_restaurant, \
    generate_menu_item_update_data
from .data.category import validate_menu_category, compare_menu_categories, \
    generate_menu_category_create_data, generate_menu_category_create_data_nonexistent_menu, \
    generate_menu_category_update_data
from .data.menu import validate_menu, compare_menus, generate_menu_create_data, \
    generate_menu_create_data_nonexistent_restaurant, generate_menu_update_data
from .data.restaurant import validate_restaurant, compare_restaurants, \
    generate_restaurant_create_data, generate_restaurant_update_data
from .data.manager import validate_restaurant_manager, compare_restaurant_managers, \
    generate_restaurant_manager_create_data, generate_restaurant_manager_update_data

from .base import BaseTestCreateWithRestaurant, BaseTestUpdateWithRestaurant, BaseTestDeleteWithRestaurant, \
    BaseTestRetrieveMixin, BaseTestCreateMixin, BaseTestDeleteMixin


class TestMenuItemService(BaseTestCreateWithRestaurant[MenuItemService],
                          BaseTestUpdateWithRestaurant[MenuItemService],
                          BaseTestDeleteWithRestaurant[MenuItemService]):
    factory = MenuItemFactory
    service_class = MenuItemService
    schema_retrieve_out = MenuItemRetrieveOut
    schema_create_in = MenuItemCreateIn
    schema_create_out = MenuItemCreateOut
    schema_update_in = MenuItemUpdateIn
    schema_update_out = MenuItemUpdateOut

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, uow):
        MenuItemFactory._meta.sqlalchemy_session = uow._session
        RestaurantFactory._meta.sqlalchemy_session = uow._session
        RestaurantManagerFactory._meta.sqlalchemy_session = uow._session

    def validate_instance(self, instance: MenuItem, data: dict) -> bool:
        return validate_menu_item(instance, data)

    def compare_instances(self, instance_1: MenuItem, instance_2: MenuItem) -> bool:
        return compare_menu_items(instance_1, instance_2)

    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        return await generate_menu_item_create_data(restaurant=restaurant)

    async def generate_instance_create_data_nonexistent_restaurant(self) -> dict:
        return await generate_menu_item_create_data_nonexistent_restaurant()

    async def generate_instance_update_data(self) -> dict:
        return await generate_menu_item_update_data()

    async def create_instance(self, restaurant: Optional[Restaurant] = None):
        if not restaurant:
            restaurant = await RestaurantFactory.create()
        return await MenuItemFactory.create(restaurant=restaurant)

    async def test_create_instance_nonexistent_restaurant(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        create_data_dict = await self.generate_instance_create_data_nonexistent_restaurant()
        create_data = self.schema_create_in(**create_data_dict)

        with pytest.raises(RestaurantNotFoundWithIdError):
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)

    async def test_list_restaurant_items_instances_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        service = MenuItemService()

        await MenuItemFactory.create()
        menu_item_list = await MenuItemFactory.create_batch(restaurant=restaurant, size=4)

        with pytest.raises(PermissionDeniedError):
            retrieved_menu_item_list = await service.list_restaurant_items_instances(restaurant.id, uow)

            assert all((self.compare_instances(menu_item, retrieved_instance)
                        for menu_item, retrieved_instance in zip(menu_item_list, retrieved_menu_item_list)))

    async def test_list_restaurant_items_instances(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuItemService(restaurant_manager=restaurant_manager)

        await MenuItemFactory.create()

        menu_item_list = await MenuItemFactory.create_batch(restaurant=restaurant, size=4)
        retrieved_menu_item_list = await service.list_restaurant_items_instances(restaurant.id, uow)

        assert all((self.compare_instances(menu_item, retrieved_instance)
                    for menu_item, retrieved_instance in zip(menu_item_list, retrieved_menu_item_list)))

    @pytest.mark.parametrize(
        "manager_owns_restaurant, expectation",
        [
            (False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, does_not_raise())
        ]
    )
    async def test_list_restaurant_items_instances_ownership(self,
                                                             manager_owns_restaurant: bool,
                                                             expectation,
                                                             uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()

        if manager_owns_restaurant:
            restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        else:
            restaurant_manager = await RestaurantManagerFactory.create()

        service = MenuItemService(restaurant_manager=restaurant_manager)
        await MenuItemFactory.create()

        menu_item_list = await self.factory.create_batch(restaurant=restaurant, size=4)

        with expectation:
            retrieved_menu_item_list = await service.list_restaurant_items_instances(restaurant.id, uow)

            assert all((self.compare_instances(menu_item, retrieved_instance)
                        for menu_item, retrieved_instance in zip(menu_item_list, retrieved_menu_item_list)))

    async def test_list_restaurant_items(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuItemService(restaurant_manager=restaurant_manager)

        await MenuItemFactory.create()

        await MenuItemFactory.create_batch(restaurant=restaurant, size=4)

        retrieved_schema_list = await service.list_restaurant_items(restaurant.id, uow)
        expected_schema_list = [MenuItemRetrieveOut(**retrieved_schema.model_dump()) for retrieved_schema in
                                retrieved_schema_list]

        assert all(retrieved_schema.model_dump() == expected_schema.model_dump()
                   for retrieved_schema, expected_schema in zip(retrieved_schema_list, expected_schema_list))


class TestMenuCategoryService(BaseTestCreateWithRestaurant[MenuCategoryService],
                              BaseTestUpdateWithRestaurant[MenuCategoryService],
                              BaseTestDeleteWithRestaurant[MenuCategoryService]):
    factory = MenuCategoryFactory
    service_class = MenuCategoryService
    schema_retrieve_out = MenuCategoryRetrieveOut
    schema_create_in = MenuCategoryCreateIn
    schema_create_out = MenuCategoryCreateOut
    schema_update_in = MenuCategoryUpdateIn
    schema_update_out = MenuCategoryUpdateOut

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, uow):
        MenuItemFactory._meta.sqlalchemy_session = uow._session
        MenuCategoryFactory._meta.sqlalchemy_session = uow._session
        MenuFactory._meta.sqlalchemy_session = uow._session
        RestaurantFactory._meta.sqlalchemy_session = uow._session
        RestaurantManagerFactory._meta.sqlalchemy_session = uow._session

    def validate_instance(self, instance: MenuCategory, data: dict) -> bool:
        return validate_menu_category(instance, data)

    def compare_instances(self, instance_1: MenuCategory, instance_2: MenuCategory) -> bool:
        return compare_menu_categories(instance_1, instance_2)

    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        return await generate_menu_category_create_data(restaurant=restaurant)

    async def generate_instance_create_data_nonexistent_menu(self) -> dict:
        return await generate_menu_category_create_data_nonexistent_menu()

    async def generate_instance_update_data(self) -> dict:
        return await generate_menu_category_update_data()

    async def create_instance(self, restaurant: Optional[Restaurant] = None):
        if not restaurant:
            restaurant = await RestaurantFactory.create()
        menu = await MenuFactory.create(restaurant=restaurant)
        return await MenuCategoryFactory.create(menu=menu)

    async def test_create_instance_nonexistent_menu(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        create_data_dict = await self.generate_instance_create_data_nonexistent_menu()
        create_data = self.schema_create_in(**create_data_dict)

        with pytest.raises(MenuNotFoundWithIdError):
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)

    async def test_add_menu_item_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        category_service = MenuCategoryService()

        menu = await MenuFactory.create(restaurant=restaurant)
        category = await MenuCategoryFactory.create(menu=menu)
        item = await MenuItemFactory.create(restaurant=restaurant)

        with pytest.raises(PermissionDeniedError):
            await category_service.add_menu_item(category.id, item.id, uow)

    @pytest.mark.parametrize(
        "manager_owns_category_restaurant, manager_owns_item_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, does_not_raise()),
        ]
    )
    async def test_add_menu_item_ownership(self,
                                           manager_owns_category_restaurant: bool,
                                           manager_owns_item_restaurant: bool,
                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()

        category_service = MenuCategoryService(restaurant_manager=restaurant_manager)

        if manager_owns_category_restaurant:
            menu = await MenuFactory.create(restaurant=restaurant_manager.restaurant)
            category = await MenuCategoryFactory.create(menu=menu)
        else:
            category = await MenuCategoryFactory.create()

        if manager_owns_item_restaurant:
            item = await MenuItemFactory.create(restaurant=restaurant_manager.restaurant)
        else:
            item = await MenuItemFactory.create()

        with expectation:
            await category_service.add_menu_item(category.id, item.id, uow)

            retrieved_category = await uow.categories.retrieve(category.id, fetch_items=True)
            assert any(compare_menu_items(item, menu_item)
                       for menu_item in retrieved_category.items)

    @pytest.mark.parametrize(
        "category_exists, item_exists, expectation",
        [
            (False, True, pytest.raises(MenuCategoryNotFoundWithIdError)),
            (True, False, pytest.raises(MenuItemNotFoundWithIdError)),
        ]
    )
    async def test_add_menu_item_nonexistent(self, category_exists: bool,
                                             item_exists: bool,
                                             expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        category_service = MenuCategoryService(restaurant_manager=restaurant_manager)

        category_id = 999
        item_id = 999

        if category_exists:
            menu = await MenuFactory.create(restaurant=restaurant_manager.restaurant)
            category = await MenuCategoryFactory.create(menu=menu)
            category_id = category.id

        if item_exists:
            item = await MenuItemFactory.create(restaurant=restaurant_manager.restaurant)
            item_id = item.id

        with expectation:
            await category_service.add_menu_item(category_id, item_id, uow)

    async def test_add_menu_item_already_added(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        category_service = MenuCategoryService(restaurant_manager=restaurant_manager)

        menu = await MenuFactory.create(restaurant=restaurant_manager.restaurant)
        category = await MenuCategoryFactory.create(menu=menu)
        item = await MenuItemFactory.create(restaurant=restaurant_manager.restaurant)

        category_id = category.id
        item_id = item.id

        category = await uow.categories.retrieve(category_id, fetch_items=True)
        category.items.add(item)

        with pytest.raises(MenuItemAlreadyInCategoryError):
            await category_service.add_menu_item(category_id, item_id, uow)

    async def test_remove_menu_item_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        category_service = MenuCategoryService()

        menu = await MenuFactory.create(restaurant=restaurant)
        category = await MenuCategoryFactory.create(menu=menu)
        item = await MenuItemFactory.create(restaurant=restaurant)

        category = await uow.categories.retrieve(category.id, fetch_items=True)
        category.items.add(item)

        with pytest.raises(PermissionDeniedError):
            await category_service.remove_menu_item(category.id, item.id, uow)

    @pytest.mark.parametrize(
        "manager_owns_category_restaurant, manager_owns_item_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, does_not_raise()),
        ]
    )
    async def test_remove_menu_item_ownership(self,
                                              manager_owns_category_restaurant: bool,
                                              manager_owns_item_restaurant: bool,
                                              expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()

        category_service = MenuCategoryService(restaurant_manager=restaurant_manager)

        if manager_owns_category_restaurant:
            menu = await MenuFactory.create(restaurant=restaurant_manager.restaurant)
            category = await MenuCategoryFactory.create(menu=menu)
        else:
            category = await MenuCategoryFactory.create()

        if manager_owns_item_restaurant:
            item = await MenuItemFactory.create(restaurant=restaurant_manager.restaurant)
        else:
            item = await MenuItemFactory.create()

        category = await uow.categories.retrieve(category.id, fetch_items=True)
        category.items.add(item)

        with expectation:
            await category_service.remove_menu_item(category.id, item.id, uow)
            assert item not in category.items

    @pytest.mark.parametrize(
        "category_exists, item_exists, expectation",
        [
            (False, True, pytest.raises(MenuCategoryNotFoundWithIdError)),
            (True, False, pytest.raises(MenuItemNotFoundWithIdError)),
        ]
    )
    async def test_remove_menu_item_nonexistent(self, category_exists: bool,
                                                item_exists: bool,
                                                expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        category_service = MenuCategoryService(restaurant_manager=restaurant_manager)

        category_id = 999
        item_id = 999

        if item_exists:
            item = await MenuItemFactory.create(restaurant=restaurant_manager.restaurant)
            item_id = item.id

        if category_exists:
            menu = await MenuFactory.create(restaurant=restaurant_manager.restaurant)
            category = await MenuCategoryFactory.create(menu=menu)
            category_id = category.id

        with expectation:
            await category_service.remove_menu_item(category_id, item_id, uow)

    async def test_remove_menu_item_not_added(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        category_service = MenuCategoryService(restaurant_manager=restaurant_manager)

        menu = await MenuFactory.create(restaurant=restaurant_manager.restaurant)
        category = await MenuCategoryFactory.create(menu=menu)
        item = await MenuItemFactory.create(restaurant=restaurant_manager.restaurant)

        category_id = category.id
        item_id = item.id

        with pytest.raises(MenuItemNotInCategoryError):
            await category_service.remove_menu_item(category_id, item_id, uow)


class TestMenuService(BaseTestCreateWithRestaurant[MenuItemService],
                      BaseTestUpdateWithRestaurant[MenuItemService],
                      BaseTestDeleteWithRestaurant[MenuItemService]):
    factory = MenuFactory
    service_class = MenuService
    schema_retrieve_out = MenuRetrieveOut
    schema_create_in = MenuCreateIn
    schema_create_out = MenuCreateOut
    schema_update_in = MenuUpdateIn
    schema_update_out = MenuUpdateOut

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, uow):
        MenuCategoryFactory._meta.sqlalchemy_session = uow._session
        MenuFactory._meta.sqlalchemy_session = uow._session
        RestaurantFactory._meta.sqlalchemy_session = uow._session
        RestaurantManagerFactory._meta.sqlalchemy_session = uow._session

    def validate_instance(self, instance: Menu, data: dict) -> bool:
        return validate_menu(instance, data)

    def compare_instances(self, instance_1: Menu, instance_2: Menu) -> bool:
        return compare_menus(instance_1, instance_2)

    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        return await generate_menu_create_data(restaurant=restaurant)

    async def generate_instance_create_data_nonexistent_restaurant(self) -> dict:
        return await generate_menu_create_data_nonexistent_restaurant()

    async def generate_instance_update_data(self) -> dict:
        return await generate_menu_update_data()

    async def create_instance(self, restaurant: Optional[Restaurant] = None):
        if not restaurant:
            restaurant = await RestaurantFactory.create()
        return await MenuFactory.create(restaurant=restaurant)

    async def test_create_instance_nonexistent_restaurant(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        create_data_dict = await self.generate_instance_create_data_nonexistent_restaurant()
        create_data = self.schema_create_in(**create_data_dict)

        with pytest.raises(RestaurantNotFoundWithIdError):
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)

    async def test_retrieve_current_restaurant_menu_nonexistent_restaurant(self, uow: SqlAlchemyUnitOfWork):
        service = MenuService()
        with pytest.raises(RestaurantNotFoundWithIdError):
            await service.retrieve_current_restaurant_menu_instance(0, uow)

    @pytest.mark.parametrize(
        "is_manager, expectation",
        [
            (True, does_not_raise()),
            (False, pytest.raises(RestaurantNotActiveError))
        ]
    )
    async def test_retrieve_current_restaurant_menu_inactive_restaurant(self,
                                                                        is_manager: bool,
                                                                        expectation, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create(is_active=False)
        if is_manager:
            restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
            service = MenuService(restaurant_manager=restaurant_manager)
        else:
            service = MenuService()

        menu = await MenuFactory.create(restaurant=restaurant)

        restaurant.current_menu_id = menu.id
        await uow.commit()

        with expectation:
            retrieved_menu = await service.retrieve_current_restaurant_menu_instance(restaurant.id, uow)
            assert restaurant.current_menu_id == retrieved_menu.id
            assert self.compare_instances(menu, retrieved_menu)

    async def test_retrieve_current_restaurant_menu_instance(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuService(restaurant_manager=restaurant_manager)
        menu = await MenuFactory.create(restaurant=restaurant)

        restaurant.current_menu_id = menu.id
        await uow.commit()

        retrieved_menu = await service.retrieve_current_restaurant_menu_instance(restaurant.id, uow)

        assert restaurant.current_menu_id == retrieved_menu.id
        assert self.compare_instances(menu, retrieved_menu)

    async def test_retrieve_current_restaurant_menu_instance_nonexistent(self,
                                                                         uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuService(restaurant_manager=restaurant_manager)

        with pytest.raises(RestaurantMissingCurrentMenuError):
            await service.retrieve_current_restaurant_menu_instance(restaurant.id, uow)

    async def test_list_restaurant_menus_instances(self, uow: SqlAlchemyUnitOfWork):
        await MenuFactory.create()
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuService(restaurant_manager=restaurant_manager)

        menu_list = await MenuFactory.create_batch(restaurant=restaurant, size=4)

        retrieved_menu_list = await service.list_restaurant_menus_instances(restaurant.id, uow)

        assert all((self.compare_instances(instance, retrieved_instance)
                    for instance, retrieved_instance in zip(menu_list, retrieved_menu_list)))

    async def test_list_restaurant_menus_instances_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        await MenuFactory.create()

        restaurant = await RestaurantFactory.create()
        service = MenuService()

        await MenuFactory.create_batch(restaurant=restaurant, size=4)
        with pytest.raises(PermissionDeniedError):
            await service.list_restaurant_menus_instances(restaurant.id, uow)

    @pytest.mark.parametrize(
        "manager_owns_instance_restaurant, expectation",
        [
            (True, does_not_raise()),
            (False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_list_restaurant_menus_instances_with_restaurant_manager(self,
                                                                           manager_owns_instance_restaurant: bool,
                                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = MenuService(restaurant_manager=restaurant_manager)
        await MenuFactory.create()

        if manager_owns_instance_restaurant:
            restaurant = restaurant_manager.restaurant
            menu_list = await MenuFactory.create_batch(restaurant=restaurant, size=4)
        else:
            restaurant = await RestaurantFactory.create()
            menu_list = await MenuFactory.create_batch(restaurant=restaurant, size=4)

        with expectation:
            retrieved_menu_list = await service.list_restaurant_menus_instances(restaurant.id, uow)
            assert all((self.compare_instances(instance, retrieved_instance)
                        for instance, retrieved_instance in zip(menu_list, retrieved_menu_list)))

    async def test_retrieve_current_restaurant_menu(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuService(restaurant_manager=restaurant_manager)

        menu = await MenuFactory.create()
        restaurant.current_menu_id = menu.id
        await uow.commit()

        retrieved_schema = await service.retrieve_current_restaurant_menu(restaurant.id, uow)
        expected_schema = MenuRetrieveOut(**retrieved_schema.model_dump())

        assert retrieved_schema.model_dump() == expected_schema.model_dump()

    async def test_list_restaurant_menus(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        service = MenuService(restaurant_manager=restaurant_manager)

        await MenuFactory.create_batch(restaurant=restaurant, size=4)

        retrieved_schema_list = await service.list_restaurant_menus(restaurant.id, uow)
        expected_schema_list = [MenuRetrieveOut(**retrieved_schema.model_dump()) for retrieved_schema in
                                retrieved_schema_list]

        assert all(retrieved_schema.model_dump() == expected_schema.model_dump()
                   for retrieved_schema, expected_schema in zip(retrieved_schema_list, expected_schema_list))


class TestRestaurantService(BaseTestCreateMixin[Restaurant, RestaurantService],
                            BaseTestDeleteMixin[RestaurantService]):
    factory = RestaurantFactory
    service_class = RestaurantService
    schema_create_in = RestaurantCreateIn
    schema_create_out = RestaurantCreateOut

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, uow):
        MenuFactory._meta.sqlalchemy_session = uow._session
        RestaurantFactory._meta.sqlalchemy_session = uow._session
        RestaurantManagerFactory._meta.sqlalchemy_session = uow._session

    def validate_instance(self, instance: Menu, data: dict) -> bool:
        return validate_restaurant(instance, data)

    def compare_instances(self, instance_1: Menu, instance_2: Menu) -> bool:
        return compare_restaurants(instance_1, instance_2)

    async def generate_instance_create_data(self) -> dict:
        restaurant_manager = await RestaurantManagerFactory.create()
        data = await generate_restaurant_create_data()
        data.update(restaurant_manager_id=restaurant_manager.id)
        return data

    async def test_delete_instance_nonexistent(self, service: RestaurantService, uow: SqlAlchemyUnitOfWork):
        with pytest.raises(RestaurantNotFoundWithIdError):
            await service.delete_instance(0, uow)

    async def test_set_current_menu_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        menu = await MenuFactory.create(restaurant=restaurant)

        restaurant_service = RestaurantService()

        with pytest.raises(PermissionDeniedError):
            await restaurant_service.set_current_menu(restaurant.id, menu.id, uow)

    async def test_set_current_menu_without_nonexistent_restaurant(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        menu = await MenuFactory.create()

        restaurant_service = RestaurantService(restaurant_manager=restaurant_manager)

        with pytest.raises(RestaurantNotFoundWithIdError):
            await restaurant_service.set_current_menu(0, menu.id, uow)

    async def test_set_current_menu_without_nonexistent_menu(self, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)

        restaurant_service = RestaurantService(restaurant_manager=restaurant_manager)

        with pytest.raises(MenuNotFoundWithIdError):
            await restaurant_service.set_current_menu(restaurant.id, 0, uow)

    @pytest.mark.parametrize(
        "manager_owns_restaurant, manager_owns_menu_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, does_not_raise()),
        ]
    )
    async def test_set_current_menu(self,
                                    manager_owns_restaurant: bool,
                                    manager_owns_menu_restaurant: bool,
                                    expectation, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()

        if manager_owns_restaurant:
            restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        else:
            restaurant_manager = await RestaurantManagerFactory.create()

        if manager_owns_menu_restaurant:
            menu = await MenuFactory.create(restaurant=restaurant)
        else:
            menu = await MenuFactory.create()

        restaurant_service = RestaurantService(restaurant_manager=restaurant_manager)

        with expectation:
            await restaurant_service.set_current_menu(restaurant.id, menu.id, uow)

            retrieved_restaurant = await uow.restaurants.retrieve(restaurant.id)

            current_menu = await uow.menus.retrieve(retrieved_restaurant.current_menu_id)
            assert compare_menus(menu, current_menu)


class TestRestaurantManagerService(BaseTestRetrieveMixin[RestaurantManager, RestaurantManagerService],
                                   BaseTestCreateMixin[RestaurantManager, RestaurantManagerService],
                                   BaseTestDeleteMixin[RestaurantManagerService]):
    factory = RestaurantManagerFactory
    service_class = RestaurantManagerService
    schema_retrieve_out = RestaurantManagerRetrieveOut
    schema_create_in = RestaurantManagerCreateIn
    schema_create_out = RestaurantManagerCreateOut

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, uow):
        RestaurantFactory._meta.sqlalchemy_session = uow._session
        RestaurantManagerFactory._meta.sqlalchemy_session = uow._session

    def validate_instance(self, instance: Menu, data: dict) -> bool:
        return validate_restaurant_manager(instance, data)

    def compare_instances(self, instance_1: Menu, instance_2: Menu) -> bool:
        return compare_restaurant_managers(instance_1, instance_2)

    async def generate_instance_create_data(self) -> dict:
        return await generate_restaurant_manager_create_data()

    async def generate_instance_update_data(self) -> dict:
        return await generate_restaurant_manager_update_data()

    async def test_delete_instance(self, service: RestaurantManagerService, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()
        await service.delete_instance(instance.id, uow)

    async def test_delete_instance_nonexistent(self, service: RestaurantManagerService, uow: SqlAlchemyUnitOfWork):
        with pytest.raises(RestaurantManagerNotFoundWithIdError):
            await service.delete_instance(0, uow)
