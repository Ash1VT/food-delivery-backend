from dataclasses import asdict
from typing import Optional

from loguru import logger
from sqlalchemy import Delete, Select, Insert, select, insert, delete, Update, update

from db.sqlalchemy.models import Customer
from models.customer import CustomerUpdateModel, CustomerModel, CustomerCreateModel
from repositories.interfaces.customer import ICustomerRepository
from repositories.sqlalchemy.base import SqlAlchemyRepository
from repositories.sqlalchemy.mappers import to_customer_model


class CustomerRepository(ICustomerRepository, SqlAlchemyRepository):
    """
    SQLAlchemy implementation of the customer repository.
    """

    def _get_retrieve_stmt(self, id: int) -> Select:
        """
        Create a SELECT statement to retrieve a customer by its ID.

        Args:
            id (int): The ID of the customer to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the customer.
        """

        return select(Customer).where(Customer.id == id)

    def _get_create_stmt(self, customer: CustomerCreateModel) -> Insert:
        """
        Create an INSERT statement to add a new customer.

        Args:
            customer (CustomerCreateModel): The dataclass containing the data to add.

        Returns:
            Insert: The INSERT statement to add the new customer.
        """

        return insert(Customer).values(asdict(customer)).returning(Customer)

    def _get_update_stmt(self, id: int, customer: CustomerUpdateModel) -> Update:
        """
        Create an UPDATE statement to modify an existing customer by its ID.

        Args:
            id (int): The ID of the customer to update.
            customer (CustomerUpdateModel): A dataclass containing the updated data.

        Returns:
            Update: The UPDATE statement to modify the existing customer.
        """

        return update(Customer).where(Customer.id == id).values(asdict(customer)).returning(Customer)

    def _get_delete_stmt(self, id: int) -> Delete:
        """
        Create a DELETE statement to remove a customer by its ID.

        Args:
            id (int): The ID of the customer to delete.

        Returns:
            Delete: The DELETE statement to remove the customer.
        """

        return delete(Customer).where(Customer.id == id)

    async def retrieve(self, id: int) -> Optional[CustomerModel]:
        stmt = self._get_retrieve_stmt(id)
        result = await self._session.execute(stmt)
        customer = result.scalar_one_or_none()

        if customer:
            logger.debug(f"Retrieved customer with id={customer.id}")
            return to_customer_model(customer)

    async def create(self, customer: CustomerCreateModel) -> CustomerModel:
        stmt = self._get_create_stmt(customer)
        result = await self._session.execute(stmt)
        customer = result.scalar_one()

        logger.debug(f"Created customer with id={customer.id}")

        return to_customer_model(customer)

    async def update(self, id: int, customer: CustomerUpdateModel) -> Optional[CustomerModel]:
        stmt = self._get_update_stmt(id, customer)
        result = await self._session.execute(stmt)
        customer = result.scalar_one_or_none()

        if customer:
            logger.debug(f"Updated customer with id={customer.id}")
            return to_customer_model(customer)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)

        logger.debug(f"Deleted customer with id={id}")
