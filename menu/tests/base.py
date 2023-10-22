from abc import ABC, abstractmethod
from contextlib import nullcontext as does_not_raise
from typing import TypeVar, Generic, Optional, Type

import pytest

from exceptions import DatabaseInstanceNotFoundError, RestaurantManagerOwnershipError, PermissionDeniedError
from models import Restaurant
from uow import SqlAlchemyUnitOfWork
from .factories import RestaurantManagerFactory

Model = TypeVar('Model')
Service = TypeVar('Service')


class BaseTestRetrieveMixin(Generic[Model, Service], ABC):
    factory = None
    service_class: Type[Service] = None
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
    service_class: Type[Service] = None
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
    service_class: Type[Service] = None
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
    service_class: Type[Service] = None
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
    service_class: Type[Service] = None

    @pytest.fixture(scope='class')
    def service(self) -> Service:
        return self.service_class()

    async def test_delete_instance(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()

        await service.delete_instance(instance.id, uow)

    async def test_delete_instance_nonexistent(self, service: Service, uow: SqlAlchemyUnitOfWork):
        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.delete_instance(0, uow)

    async def test_delete(self, service: Service, uow: SqlAlchemyUnitOfWork):
        instance = await self.factory.create()
        await service.delete(instance.id, uow)


class BaseTestCreateWithRestaurant(Generic[Service], ABC):
    service_class: Service = None
    schema_create_in = None
    schema_create_out = None

    @abstractmethod
    async def generate_instance_create_data(self, restaurant: Optional[Restaurant] = None) -> dict:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    async def test_create_instance_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        service = self.service_class()

        create_data_dict = await self.generate_instance_create_data()
        create_data = self.schema_create_in(**create_data_dict)

        with pytest.raises(PermissionDeniedError):
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)

    @pytest.mark.parametrize(
        "manager_owns_instance_restaurant, expectation",
        [
            (True, does_not_raise()),
            (False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_create_instance_with_restaurant_manager(self,
                                                           manager_owns_instance_restaurant: bool,
                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        if manager_owns_instance_restaurant:
            create_data_dict = await self.generate_instance_create_data(restaurant=restaurant_manager.restaurant)
        else:
            create_data_dict = await self.generate_instance_create_data()

        create_data = self.schema_create_in(**create_data_dict)

        with expectation:
            created_instance = await service.create_instance(create_data, uow)
            assert self.validate_instance(created_instance, create_data_dict)

    async def test_create(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        create_data_dict = await self.generate_instance_create_data(restaurant=restaurant_manager.restaurant)
        create_data = self.schema_create_in(**create_data_dict)

        created_schema = await service.create(create_data, uow)
        expected_schema = self.schema_create_out(**created_schema.model_dump())

        assert created_schema.model_dump() == expected_schema.model_dump()


class BaseTestUpdateWithRestaurant(Generic[Service], ABC):
    factory = None
    service_class: Service = None
    schema_update_in = None
    schema_update_out = None

    @abstractmethod
    async def generate_instance_update_data(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def validate_instance(self, instance: Model, data: dict) -> bool:
        raise NotImplementedError

    @abstractmethod
    async def create_instance(self, restaurant: Optional[Restaurant] = None):
        raise NotImplementedError

    async def test_update_instance_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        service = self.service_class()
        instance = await self.factory.create()

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        with pytest.raises(PermissionDeniedError):
            updated_instance = await service.update_instance(instance.id, update_data, uow)
            assert self.validate_instance(updated_instance, update_data_dict)

    @pytest.mark.parametrize(
        "manager_owns_instance_restaurant, expectation",
        [
            (True, does_not_raise()),
            (False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_update_instance_with_restaurant_manager(self,
                                                           manager_owns_instance_restaurant: bool,
                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        if manager_owns_instance_restaurant:
            instance = await self.create_instance(restaurant=restaurant_manager.restaurant)
        else:
            instance = await self.create_instance()

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        with expectation:
            updated_instance = await service.update_instance(instance.id, update_data, uow)
            assert self.validate_instance(updated_instance, update_data_dict)

    async def test_update_instance_nonexistent(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.update_instance(0, update_data, uow)

    async def test_update(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        instance = await self.create_instance(restaurant=restaurant_manager.restaurant)

        update_data_dict = await self.generate_instance_update_data()
        update_data = self.schema_update_in(**update_data_dict)

        updated_schema = await service.update(instance.id, update_data, uow)
        expected_schema = self.schema_update_out(**updated_schema.model_dump())

        assert updated_schema.model_dump() == expected_schema.model_dump()


class BaseTestDeleteWithRestaurant(Generic[Service], ABC):
    factory = None
    service_class: Service = None

    @abstractmethod
    async def create_instance(self, restaurant: Optional[Restaurant] = None):
        raise NotImplementedError

    async def test_delete_instance_without_restaurant_manager(self, uow: SqlAlchemyUnitOfWork):
        service = self.service_class()
        instance = await self.factory.create()

        with pytest.raises(PermissionDeniedError):
            await service.delete_instance(instance.id, uow)

    @pytest.mark.parametrize(
        "manager_owns_instance_restaurant, expectation",
        [
            (True, pytest.raises(DatabaseInstanceNotFoundError)),
            (False, pytest.raises(RestaurantManagerOwnershipError))
        ]
    )
    async def test_delete_instance_with_restaurant_manager(self,
                                                           manager_owns_instance_restaurant: bool,
                                                           expectation, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        if manager_owns_instance_restaurant:
            instance = await self.create_instance(restaurant=restaurant_manager.restaurant)
        else:
            instance = await self.create_instance()

        with expectation:
            await service.delete_instance(instance.id, uow)
            await service.delete_instance(instance.id, uow)

    async def test_delete_instance_nonexistent(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)

        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.delete_instance(0, uow)

    async def test_delete(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        service = self.service_class(restaurant_manager=restaurant_manager)
        instance = await self.create_instance(restaurant=restaurant_manager.restaurant)
        with pytest.raises(DatabaseInstanceNotFoundError):
            await service.delete(instance.id, uow)
            await service.delete(instance.id, uow)
