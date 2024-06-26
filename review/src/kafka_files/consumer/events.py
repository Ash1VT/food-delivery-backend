from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from models.courier import CourierModel, CourierCreateModel
from models.customer import CustomerCreateModel, CustomerUpdateModel
from models.menu_item import MenuItemCreateModel, MenuItemModel
from models.order import OrderCreateModel
from models.restaurant import RestaurantCreateModel, RestaurantUpdateModel
from uow.generic import GenericUnitOfWork
from uow.utils import uow_transaction_with_commit

CreateModel = TypeVar("CreateModel")


class ConsumerEvent(Generic[CreateModel], ABC):
    """
    Base class for all consumer events.

    Consumer events are used for simplifying receiving messages from Kafka and processing them.
    """

    def __init__(self, data: dict):
        """
        Constructor for the inherited classes from ConsumerEvent class.

        Args:
            data (dict): The received data.
        """

        self._data = data

    @abstractmethod
    def _serialize_data(self) -> CreateModel:
        """
        Serializes the data.

        Returns:
            Model: Serialized data.
        """

        raise NotImplementedError

    @abstractmethod
    async def action(self, uow: GenericUnitOfWork):
        """
        Action to be executed on the event.

        Args:
            uow (GenericUnitOfWork): The unit of work instance.
        """

        raise NotImplementedError

    @classmethod
    def get_event_name(cls) -> str:
        """
        Returns the name of the event.

        Returns:
            str: Name of the event.
        """

        return cls.__name__


class CourierCreatedEvent(ConsumerEvent[CourierCreateModel]):
    """
    Event when Courier is created.
    """

    def _serialize_data(self) -> CourierCreateModel:
        return CourierCreateModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        async with uow_transaction_with_commit(uow) as uow:
            await uow.couriers.create(self._serialize_data())


class CustomerCreatedEvent(ConsumerEvent[CustomerCreateModel]):
    """
    Event when Customer is created.
    """

    def _serialize_data(self) -> CustomerCreateModel:
        return CustomerCreateModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        async with uow_transaction_with_commit(uow) as uow:
            await uow.customers.create(self._serialize_data())


class CustomerUpdatedEvent(ConsumerEvent[CustomerUpdateModel]):
    """
    Event when Customer is updated.
    """

    def _serialize_data(self) -> CustomerUpdateModel:
        return CustomerUpdateModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        customer_id = self._data.pop("id")
        async with uow_transaction_with_commit(uow) as uow:
            await uow.customers.update(customer_id, self._serialize_data())


class MenuItemCreatedEvent(ConsumerEvent[MenuItemCreateModel]):
    """
    Event when MenuItem is created.
    """

    def _serialize_data(self) -> MenuItemCreateModel:
        return MenuItemCreateModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        async with uow_transaction_with_commit(uow) as uow:
            await uow.menu_items.create(self._serialize_data())


class MenuItemDeletedEvent(ConsumerEvent[MenuItemModel]):
    """
    Event when MenuItem is deleted.
    """

    def _serialize_data(self) -> MenuItemModel:
        return MenuItemModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        menu_item_id = self._data.pop("id")
        async with uow_transaction_with_commit(uow) as uow:
            await uow.menu_items.delete(menu_item_id)


class OrderFinishedEvent(ConsumerEvent[OrderCreateModel]):
    """
    Event when Order is created.
    """

    def _serialize_data(self) -> OrderCreateModel:
        return OrderCreateModel(
            id=int(self._data["id"]),
            customer_id=int(self._data['customer_id']),
            courier_id=int(self._data['courier_id'])
        )

    async def action(self, uow: GenericUnitOfWork):
        async with uow_transaction_with_commit(uow) as uow:
            await uow.orders.create(self._serialize_data())


class RestaurantCreatedEvent(ConsumerEvent[RestaurantCreateModel]):
    """
    Event when Restaurant is created.
    """

    def _serialize_data(self) -> RestaurantCreateModel:
        return RestaurantCreateModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        async with uow_transaction_with_commit(uow) as uow:
            await uow.restaurants.create(self._serialize_data())


class RestaurantUpdatedEvent(ConsumerEvent[RestaurantUpdateModel]):
    """
    Event when Restaurant is created.
    """

    def _serialize_data(self) -> RestaurantUpdateModel:
        return RestaurantUpdateModel(**self._data)

    async def action(self, uow: GenericUnitOfWork):
        restaurant_id = self._data.pop("id")

        async with uow_transaction_with_commit(uow) as uow:
            await uow.restaurants.update(restaurant_id, self._serialize_data())
