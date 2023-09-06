from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Optional
from contextlib import nullcontext as does_not_raise

import pytest
from multimethod import multimethod

from .factories import MenuItemFactory, MenuCategoryFactory, MenuFactory, RestaurantFactory, RestaurantManagerFactory
from models import MenuItem, MenuCategory, Menu, Restaurant, RestaurantManager
from services import MenuItemService, MenuCategoryService, MenuService, RestaurantService, RestaurantManagerService
from uow import SqlAlchemyUnitOfWork
from exceptions import DatabaseInstanceNotFoundError, MenuCategoryNotFoundWithIdError, MenuItemNotFoundWithIdError, \
    RestaurantNotFoundWithIdError, MenuItemAlreadyInCategoryError, \
    RestaurantManagerNotActiveError, RestaurantManagerOwnershipError, RestaurantAlreadyExistsWithIdError, \
    CurrentMenuMissingError
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

Model = TypeVar('Model')
Service = TypeVar('Service')


# Base #

class BaseTestRetrieveMixin(Generic[Model, Service], ABC):
    factory = None
    service_class: Service = None
    schema_retrieve_out = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @abstractmethod
    def compare_instances(self, instance_1: Model, instance_2: Model) -> bool:
        raise NotImplementedError

    async def test_retrieve_instance(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()
        retrieved_instance = await service.retrieve_instance(instance.id, uow)

        assert self.compare_instances(instance, retrieved_instance)

    async def test_retrieve_instance_nonexistent(self, service: Service, uow: SqlAlchemyUnitOfWork):
        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.retrieve_instance(0, uow)

    async def test_retrieve(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()

        retrieved_schema = await service.retrieve(instance.id, uow)
        expected_schema = self.schema_retrieve_out(**retrieved_schema.model_dump())

        assert retrieved_schema.model_dump() == expected_schema.model_dump()


class BaseTestListMixin(Generic[Model, Service], ABC):
    factory = None
    service_class: Service = None
    schema_retrieve_out = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @abstractmethod
    def compare_instances(self, instance_1: Model, instance_2: Model) -> bool:
        raise NotImplementedError

    async def test_list_instances(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance_list = await self.factory.create_batch(size=4)
        retrieved_instance_list = await service.list_instances(uow)
        assert all((self.compare_instances(instance, retrieved_instance)
                    for instance, retrieved_instance in zip(instance_list, retrieved_instance_list)))

    async def test_list(self, service: Service, uow: SqlAlchemyUnitOfWork):
        await self.factory.create_batch(size=4)

        retrieved_schema_list = await service.list(uow)
        expected_schema_list = [self.schema_retrieve_out(**retrieved_schema.model_dump()) for retrieved_schema in
                                retrieved_schema_list]

        assert all(retrieved_schema.model_dump() == expected_schema.model_dump()
                   for retrieved_schema, expected_schema in zip(retrieved_schema_list, expected_schema_list))


class BaseTestCreateMixin(Generic[Model, Service], ABC):
    factory = None
    service_class: Service = None
    schema_create_in = None
    schema_create_out = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @abstractmethod
    async def generate_instance_create_data(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    async def test_create_instance(self, service: Service, uow: SqlAlchemyUnitOfWork):
        create_data_dict = await self.generate_instance_create_data()
        create_data = self.schema_create_in(**create_data_dict)

        created_instance = await service.create_instance(create_data, uow)

        assert self.validate_instance(created_instance, create_data_dict)

    async def test_create(self, service: Service, uow: SqlAlchemyUnitOfWork):
        create_data_dict = await self.generate_instance_create_data()
        create_data = self.schema_create_in(**create_data_dict)

        created_schema = await service.create(create_data, uow)
        expected_schema = self.schema_create_out(**created_schema.model_dump())

        assert created_schema.model_dump() == expected_schema.model_dump()


class BaseTestUpdateMixin(Generic[Model, Service], ABC):
    factory = None
    service_class: Service = None
    schema_update_in = None
    schema_update_out = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @abstractmethod
    async def generate_instance_update_data(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    async def test_update_instance(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        updated_instance = await service.update_instance(instance.id, update_data, uow)

        assert self.validate_instance(updated_instance, update_data_dict)

    async def test_update_instance_nonexistent(self, service: Service, uow: SqlAlchemyUnitOfWork):
        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.update_instance(0, update_data, uow)

    async def test_update(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        updated_schema = await service.update(instance.id, update_data, uow)
        expected_schema = self.schema_update_out(**updated_schema.model_dump())

        assert updated_schema.model_dump() == expected_schema.model_dump()


class BaseTestDeleteMixin(Generic[Service], ABC):
    factory = None
    service_class: Service = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    async def test_delete_instance(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()

        await service.delete_instance(instance.id, uow)

        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.retrieve_instance(instance.id, uow)

    async def test_delete_instance_nonexistent(self, service: Service, uow: SqlAlchemyUnitOfWork):
        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.delete_instance(0, uow)

    async def test_delete(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()
        await service.delete(instance.id, uow)


class BaseTestCreateWithRestaurant(Generic[Service], ABC):
    factory = None
    service_class: Service = None
    schema_create_in = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @abstractmethod
    @multimethod
    async def generate_instance_create_data(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    @multimethod
    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        raise NotImplementedError

    @abstractmethod
    async def generate_instance_create_data_nonexistent_restaurant(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    async def test_create_instance_nonexistent_restaurant(self, service: Service, uow: SqlAlchemyUnitOfWork):
        create_data_dict = await self.generate_instance_create_data_nonexistent_restaurant()
        create_data = self.schema_create_in(**create_data_dict)

        with pytest.raises(RestaurantNotFoundWithIdError):
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_instance_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, True, does_not_raise()),
            (True, False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_create_instance_with_restaurant_manager(self, is_manager_active: bool,
                                                           manager_owns_instance_restaurant: bool,
                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)
        service = self.service_class(restaurant_manager=restaurant_manager)

        if manager_owns_instance_restaurant:
            create_data_dict = await self.generate_instance_create_data(restaurant=restaurant_manager.restaurant)
        else:
            create_data_dict = await self.generate_instance_create_data()

        create_data = self.schema_create_in(**create_data_dict)

        with expectation:
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)


class BaseTestUpdateWithRestaurant(Generic[Service], ABC):
    factory = None
    service_class: Service = None
    schema_update_in = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @abstractmethod
    async def generate_instance_update_data(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_instance_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, True, does_not_raise()),
            (True, False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_update_instance_with_restaurant_manager(self, is_manager_active: bool,
                                                           manager_owns_instance_restaurant: bool,
                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)
        service = self.service_class(restaurant_manager=restaurant_manager)

        if manager_owns_instance_restaurant:
            instance = await self.factory.create(restaurant=restaurant_manager.restaurant)
        else:
            instance = await self.factory.create()

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        with expectation:
            updated_instance = await service.update_instance(instance.id, update_data, uow)
            assert self.validate_instance(updated_instance, update_data_dict)


class BaseTestDeleteWithRestaurant(Generic[Service], ABC):
    factory = None
    service_class: Service = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_instance_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, True, pytest.raises(DatabaseInstanceNotFoundError)),
            (True, False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_delete_instance_with_restaurant_manager(self, is_manager_active: bool,
                                                           manager_owns_instance_restaurant: bool,
                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)
        service = self.service_class(restaurant_manager=restaurant_manager)

        if manager_owns_instance_restaurant:
            instance = await self.factory.create(restaurant=restaurant_manager.restaurant)
        else:
            instance = await self.factory.create()

        with expectation:
            await service.delete_instance(instance.id, uow)
            await service.retrieve_instance(instance.id, uow)


# Concrete #

class TestMenuItemService(BaseTestRetrieveMixin[MenuItem, MenuItemService],
                          BaseTestListMixin[MenuItem, MenuItemService],
                          BaseTestCreateMixin[MenuItem, MenuItemService],
                          BaseTestUpdateMixin[MenuItem, MenuItemService],
                          BaseTestDeleteMixin[MenuItemService],
                          BaseTestCreateWithRestaurant[MenuItemService],
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

    @multimethod
    async def generate_instance_create_data(self) -> dict:
        return await generate_menu_item_create_data()

    @multimethod
    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        return await generate_menu_item_create_data(restaurant=restaurant)

    async def generate_instance_create_data_nonexistent_restaurant(self) -> dict:
        return await generate_menu_item_create_data_nonexistent_restaurant()

    async def generate_instance_update_data(self) -> dict:
        return await generate_menu_item_update_data()

    async def test_list_restaurant_items_instances(self, service: MenuItemService, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        await MenuItemFactory.create()

        menu_item_list = await MenuItemFactory.create_batch(restaurant=restaurant, size=4)
        retrieved_menu_item_list = await service.list_restaurant_items_instances(restaurant.id, uow)

        assert all((self.compare_instances(menu_item, retrieved_instance)
                    for menu_item, retrieved_instance in zip(menu_item_list, retrieved_menu_item_list)))

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, does_not_raise())
        ]
    )
    async def test_list_restaurant_items_instances_ownership(self, is_manager_active: bool,
                                                             manager_owns_restaurant: bool,
                                                             expectation,
                                                             uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()

        if manager_owns_restaurant:
            restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active,
                                                                       restaurant=restaurant)
        else:
            restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)

        service = MenuItemService(restaurant_manager=restaurant_manager)
        await MenuItemFactory.create()

        menu_item_list = await self.factory.create_batch(restaurant=restaurant, size=4)

        with expectation:
            retrieved_menu_item_list = await service.list_restaurant_items_instances(restaurant.id, uow)

            assert all((self.compare_instances(menu_item, retrieved_instance)
                        for menu_item, retrieved_instance in zip(menu_item_list, retrieved_menu_item_list)))

    async def test_list_restaurant_items(self, service: MenuItemService, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        await MenuItemFactory.create()

        await MenuItemFactory.create_batch(restaurant=restaurant, size=4)

        retrieved_schema_list = await service.list_restaurant_items(restaurant.id, uow)
        expected_schema_list = [MenuItemRetrieveOut(**retrieved_schema.model_dump()) for retrieved_schema in
                                retrieved_schema_list]

        assert all(retrieved_schema.model_dump() == expected_schema.model_dump()
                   for retrieved_schema, expected_schema in zip(retrieved_schema_list, expected_schema_list))


class TestMenuCategoryService(BaseTestRetrieveMixin[MenuCategory, MenuCategoryService],
                              BaseTestListMixin[MenuCategory, MenuCategoryService],
                              BaseTestCreateMixin[MenuCategory, MenuCategoryService],
                              BaseTestUpdateMixin[MenuCategory, MenuCategoryService],
                              BaseTestDeleteMixin[MenuCategoryService]):
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

    async def generate_instance_create_data(self) -> dict:
        return await generate_menu_category_create_data()

    async def generate_instance_update_data(self) -> dict:
        return await generate_menu_category_update_data()

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_category_restaurant, manager_owns_item_restaurant, use_instance, expectation",
        [
            (False, True, True, False, pytest.raises(RestaurantManagerNotActiveError)),
            (True, False, True, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, False, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, True, False, does_not_raise()),
            # Same tests but with passing instance of menu item
            (False, True, True, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, False, True, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, False, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, True, True, does_not_raise()),
        ]
    )
    async def test_add_menu_item_ownership(self, is_manager_active: bool,
                                           manager_owns_category_restaurant: bool,
                                           manager_owns_item_restaurant: bool,
                                           use_instance: bool,
                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)

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
            if use_instance:
                await category_service.add_menu_item(category.id, item, uow)
            else:
                await category_service.add_menu_item(category.id, item.id, uow)

            retrieved_category = await category_service.retrieve_instance(category.id, uow, fetch_items=True)
            assert any(compare_menu_items(item, menu_item)
                       for menu_item in retrieved_category.items)

    @pytest.mark.parametrize(
        "category_exists, item_exists, expectation",
        [
            (False, True, pytest.raises(MenuCategoryNotFoundWithIdError)),
            (True, False, pytest.raises(MenuItemNotFoundWithIdError)),
            (True, True, does_not_raise()),
        ]
    )
    async def test_add_menu_item_exists_with_id(self, category_exists: bool,
                                                item_exists: bool,
                                                expectation, uow: SqlAlchemyUnitOfWork):
        category_service = MenuCategoryService()
        item_service = MenuItemService()
        category_id = 999
        item_id = 999

        if category_exists:
            category = await MenuCategoryFactory.create()
            category_id = category.id

        if item_exists:
            item = await MenuItemFactory.create()
            item_id = item.id

        with expectation:
            await category_service.add_menu_item(category_id, item_id, uow)

            retrieved_category = await category_service.retrieve_instance(category_id, uow, fetch_items=True)
            item = await item_service.retrieve_instance(item_id, uow)

            assert any(compare_menu_items(item, menu_item)
                       for menu_item in retrieved_category.items)

    async def test_add_menu_item_already_added_with_id(self, uow: SqlAlchemyUnitOfWork):
        category_service = MenuCategoryService()

        category = await MenuCategoryFactory.create()
        item = await MenuItemFactory.create()

        category_id = category.id
        item_id = item.id

        category = await category_service.retrieve_instance(category_id, uow, fetch_items=True)
        category.items.add(item)

        with pytest.raises(MenuItemAlreadyInCategoryError):
            await category_service.add_menu_item(category_id, item_id, uow)

    @pytest.mark.parametrize(
        "category_exists, expectation",
        [
            (False, pytest.raises(MenuCategoryNotFoundWithIdError)),
            (True, does_not_raise()),
        ]
    )
    async def test_add_menu_item_exists_with_instance(self, category_exists: bool,
                                                      expectation, uow: SqlAlchemyUnitOfWork):
        category_service = MenuCategoryService()

        item = await MenuItemFactory.create()

        category_id = 999

        if category_exists:
            category = await MenuCategoryFactory.create()
            category_id = category.id

        with expectation:
            await category_service.add_menu_item(category_id, item, uow)

            retrieved_category = await category_service.retrieve_instance(category_id, uow, fetch_items=True)

            assert any(compare_menu_items(item, menu_item)
                       for menu_item in retrieved_category.items)

    async def test_add_menu_item_already_added_with_instance(self, uow: SqlAlchemyUnitOfWork):
        category_service = MenuCategoryService()

        category = await MenuCategoryFactory.create()
        item = await MenuItemFactory.create()

        category_id = category.id

        category = await category_service.retrieve_instance(category_id, uow, fetch_items=True)
        category.items.add(item)

        with pytest.raises(MenuItemAlreadyInCategoryError):
            await category_service.add_menu_item(category_id, item, uow)


class TestMenuService(BaseTestRetrieveMixin[Menu, MenuService],
                      BaseTestListMixin[Menu, MenuService],
                      BaseTestCreateMixin[Menu, MenuService],
                      BaseTestUpdateMixin[Menu, MenuService],
                      BaseTestDeleteMixin[MenuService],
                      BaseTestCreateWithRestaurant[MenuItemService],
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

    @multimethod
    async def generate_instance_create_data(self) -> dict:
        return await generate_menu_create_data()

    @multimethod
    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        return await generate_menu_create_data(restaurant=restaurant)

    async def generate_instance_create_data_nonexistent_restaurant(self) -> dict:
        return await generate_menu_create_data_nonexistent_restaurant()

    async def generate_instance_update_data(self) -> dict:
        return await generate_menu_update_data()

    async def test_retrieve_current_restaurant_menu_instance(self, service: MenuService, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        menu = await MenuFactory.create(restaurant=restaurant)

        restaurant.current_menu_id = menu.id
        await uow.commit()

        retrieved_menu = await service.retrieve_current_restaurant_menu_instance(restaurant.id, uow)

        assert restaurant.current_menu_id == retrieved_menu.id
        assert self.compare_instances(menu, retrieved_menu)

    async def test_retrieve_current_restaurant_menu_instance_nonexistent(self, service: MenuService,
                                                                          uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()

        with pytest.raises(CurrentMenuMissingError):
            await service.retrieve_current_restaurant_menu_instance(restaurant.id, uow)

    async def test_list_restaurant_menus_instances(self, service: MenuService, uow: SqlAlchemyUnitOfWork):
        await MenuFactory.create()
        restaurant = await RestaurantFactory.create()
        menu_list = await MenuFactory.create_batch(restaurant=restaurant, size=4)

        retrieved_menu_list = await service.list_restaurant_menus_instances(restaurant.id, uow)

        assert all((self.compare_instances(instance, retrieved_instance)
                    for instance, retrieved_instance in zip(menu_list, retrieved_menu_list)))

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_instance_restaurant, expectation",
        [
            (False, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, True, does_not_raise()),
            (True, False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_list_restaurant_menus_instances_with_restaurant_manager(self, is_manager_active: bool,
                                                                           manager_owns_instance_restaurant: bool,
                                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)
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

    async def test_retrieve_current_restaurant_menu(self, service: MenuService, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        menu = await MenuFactory.create()
        restaurant.current_menu_id = menu.id
        await uow.commit()

        retrieved_schema = await service.retrieve_current_restaurant_menu(restaurant.id, uow)
        expected_schema = MenuRetrieveOut(**retrieved_schema.model_dump())

        assert retrieved_schema.model_dump() == expected_schema.model_dump()

    async def test_list_restaurant_menus(self, service: MenuService, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        await MenuFactory.create_batch(restaurant=restaurant, size=4)

        retrieved_schema_list = await service.list_restaurant_menus(restaurant.id, uow)
        expected_schema_list = [MenuRetrieveOut(**retrieved_schema.model_dump()) for retrieved_schema in
                                retrieved_schema_list]

        assert all(retrieved_schema.model_dump() == expected_schema.model_dump()
                   for retrieved_schema, expected_schema in zip(retrieved_schema_list, expected_schema_list))


class TestRestaurantService(BaseTestRetrieveMixin[Restaurant, RestaurantService],
                            BaseTestCreateMixin[Restaurant, RestaurantService],
                            BaseTestDeleteMixin[RestaurantService]):
    factory = RestaurantFactory
    service_class = RestaurantService
    schema_retrieve_out = RestaurantRetrieveOut
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
        return await generate_restaurant_create_data()

    async def test_create_instance_already_exists(self, service: RestaurantService, uow: SqlAlchemyUnitOfWork):
        create_data_dict = await generate_restaurant_create_data()
        create_data = self.schema_create_in(**create_data_dict)

        await RestaurantFactory.create(id=create_data_dict.get('id'))

        with pytest.raises(RestaurantAlreadyExistsWithIdError):
            await service.create_instance(create_data, uow)

    async def test_delete_instance_nonexistent(self, service: RestaurantService, uow: SqlAlchemyUnitOfWork):
        await service.delete_instance(0, uow)

    @pytest.mark.parametrize(
        "is_manager_active, manager_owns_restaurant, manager_owns_menu_restaurant, use_instance, expectation",
        [
            (False, True, True, False, pytest.raises(RestaurantManagerNotActiveError)),
            (True, False, True, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, False, False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, True, False, does_not_raise()),
            # Same tests but with passing instance of menu
            (False, True, True, True, pytest.raises(RestaurantManagerNotActiveError)),
            (True, False, True, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, False, True, pytest.raises(RestaurantManagerOwnershipError)),
            (True, True, True, True, does_not_raise()),
        ]
    )
    async def test_set_current_menu(self, is_manager_active: bool,
                                    manager_owns_restaurant: bool,
                                    manager_owns_menu_restaurant: bool,
                                    use_instance: bool,
                                    expectation, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()

        if manager_owns_restaurant:
            restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active,
                                                                       restaurant=restaurant)
        else:
            restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)

        if manager_owns_menu_restaurant:
            menu = await MenuFactory.create(restaurant=restaurant)
        else:
            menu = await MenuFactory.create()

        restaurant_service = RestaurantService(restaurant_manager=restaurant_manager)

        with expectation:
            if use_instance:
                await restaurant_service.set_current_menu(restaurant.id, menu, uow)
            else:
                await restaurant_service.set_current_menu(restaurant.id, menu.id, uow)

            retrieved_restaurant = await restaurant_service.retrieve_instance(restaurant.id, uow)

            menu_service = MenuService()

            current_menu = await menu_service.retrieve_instance(retrieved_restaurant.current_menu_id, uow)

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
        await service.delete_instance(0, uow)
