from abc import abstractmethod, ABC
from typing import TypeVar, Optional, Generic, List

from sqlalchemy import select, insert, update, delete, Select, Insert, Update, Delete, exists
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import CustomBase

Model = TypeVar("Model", bound=CustomBase)


class GenericRepository(Generic[Model], ABC):
    """
    A generic abstract base class representing a repository interface for database operations.

    This class defines common methods for CRUD (Create, Retrieve, Update, Delete) operations on a database model.
    """

    @abstractmethod
    async def retrieve(self, id: int, *args, **kwargs) -> Optional[Model]:
        """Retrieve a record by its ID.

        Args:
            id (int): The ID of the record to retrieve.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Model]: The retrieved record or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def list(self, *args, **kwargs) -> List[Model]:
        """Retrieve a list of records or None if not found.

        Args:
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            List[Model]: List of records.
        """

        raise NotImplementedError

    @abstractmethod
    async def create(self, data: dict, *args, **kwargs) -> Model:
        """Create a new record and return it.

        Args:
            data (dict): A dictionary containing the data for the new record.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Model: The newly created record.
        """

        raise NotImplementedError

    @abstractmethod
    async def update(self, id: int, data: dict, *args, **kwargs) -> Optional[Model]:
        """Update an existing record by its ID and return updated record.

        Args:
            id (int): The ID of the record to update.
            data (dict): A dictionary containing the updated data.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Optional[Model]: The updated record or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def delete(self, id: int, *args, **kwargs):
        """Delete a record by its ID and returns it.

        Args:
            id (int): The ID of the record to delete.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        """

        raise NotImplementedError

    @abstractmethod
    async def exists(self, id: int) -> bool:
        raise NotImplementedError


class SQLAlchemyRepository(GenericRepository[Model], ABC):
    """An abstract base class for repository operations using SQLAlchemy."""

    model: Model = None

    def __init__(self, session: AsyncSession):
        """Initialize a new SQLAlchemyRepository instance.

        Args:
            session (AsyncSession): An asynchronous SQLAlchemy session.
        """

        self._session = session

    def _get_retrieve_stmt(self, id: int, **kwargs) -> Select:
        """Create a SELECT statement to retrieve a record by its ID.

        Args:
            id (int): The ID of the record to retrieve.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the record.
        """

        return select(self.model).where(self.model.id == id)

    def _get_list_stmt(self, **kwargs) -> Select:
        """Create a SELECT statement to retrieve a list of records.

        Args:
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve the list of records.
        """

        return select(self.model)

    def _get_create_stmt(self, data: dict, **kwargs) -> Insert:
        """Create an INSERT statement to add a new record.

        Args:
            data (dict): A dictionary containing the data for the new record.
            **kwargs: Additional keyword arguments.

        Returns:
            Insert: The INSERT statement to add the new record.
        """

        return insert(self.model).values(**data).returning(self.model)

    def _get_update_stmt(self, id: int, data: dict, **kwargs) -> Update:
        """Create an UPDATE statement to modify an existing record by its ID.

        Args:
            id (int): The ID of the record to update.
            data (dict): A dictionary containing the updated data.
            **kwargs: Additional keyword arguments.

        Returns:
            Update: The UPDATE statement to modify the existing record.
        """

        return update(self.model).where(self.model.id == id).values(**data).returning(self.model)

    def _get_delete_stmt(self, id: int, **kwargs) -> Delete:
        """Create a DELETE statement to remove a record by its ID.

        Args:
            id (int): The ID of the record to delete.
            **kwargs: Additional keyword arguments.

        Returns:
            Delete: The DELETE statement to remove the record.
        """

        return delete(self.model).where(self.model.id == id)

    def _get_exists_stmt(self, id: int, **kwargs) -> Select:
        stmt = self._get_retrieve_stmt(id, **kwargs)
        return select(exists(stmt))

    async def retrieve(self, id: int, **kwargs) -> Optional[Model]:
        stmt = self._get_retrieve_stmt(id=id, **kwargs)

        result = await self._session.execute(stmt)

        return result.scalar_one_or_none()

    async def list(self, **kwargs) -> List[Model]:
        stmt = self._get_list_stmt(**kwargs)
        result = await self._session.execute(stmt)

        return [r[0] for r in result.fetchall()]

    async def create(self, data: dict, **kwargs) -> Model:
        stmt = self._get_create_stmt(data=data, **kwargs)
        result = await self._session.execute(stmt)

        return result.scalar_one()

    async def update(self, id: int, data: dict, **kwargs) -> Optional[Model]:
        stmt = self._get_update_stmt(id=id, data=data, **kwargs)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()

    async def delete(self, id: int, **kwargs):
        stmt = self._get_delete_stmt(id=id, **kwargs)
        await self._session.execute(stmt)

    async def exists(self, id: int, **kwargs) -> bool:
        stmt = self._get_exists_stmt(id, **kwargs)
        result = await self._session.execute(stmt)
        return result.scalar()
