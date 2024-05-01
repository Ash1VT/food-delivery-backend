from dataclasses import asdict
from typing import Optional

from sqlalchemy import Select, select, Insert, insert, Delete, delete

from db.sqlalchemy.models import Order
from models.order import OrderCreateModel, OrderModel
from repositories.interfaces.order import IOrderRepository
from repositories.sqlalchemy.base import SqlAlchemyRepository
from repositories.sqlalchemy.mappers import to_order_model


class OrderRepository(IOrderRepository, SqlAlchemyRepository):
    """
    SQLAlchemy implementation of the order repository.
    """

    def _get_retrieve_stmt(self, id: int) -> Select:
        """
        Create a SELECT statement to retrieve an order by its ID.

        Args:
            id (int): The ID of the order to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the order.
        """

        return select(Order).where(Order.id == id)

    def _get_create_stmt(self, order: OrderCreateModel) -> Insert:
        """
        Create an INSERT statement to add a new order.

        Args:
            order (OrderCreateModel): The dataclass containing the data to add.

        Returns:
            Insert: The INSERT statement to add the new order.
        """

        return insert(Order).values(asdict(order)).returning(Order)

    def _get_delete_stmt(self, id: int) -> Delete:
        """
        Create a DELETE statement to remove an order by its ID.

        Args:
            id (int): The ID of the order to delete.

        Returns:
            Delete: The DELETE statement to remove the order.
        """

        return delete(Order).where(Order.id == id)

    async def retrieve(self, id: int) -> Optional[OrderModel]:
        stmt = self._get_retrieve_stmt(id)
        result = await self._session.execute(stmt)
        order = result.scalar_one_or_none()
        if order:
            return to_order_model(order)

    async def create(self, order: OrderCreateModel) -> OrderModel:
        stmt = self._get_create_stmt(order)
        result = await self._session.execute(stmt)
        order = result.scalar_one()
        return to_order_model(order)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)
