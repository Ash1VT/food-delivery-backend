from abc import ABC, abstractmethod
from typing import Optional, TypeVar, Generic

Model = TypeVar("Model")
CreateModel = TypeVar("CreateModel")
UpdateModel = TypeVar("UpdateModel")


class IRetrieveMixin(Generic[Model], ABC):
    """
    Interface for retrieve mixin.
    """

    @abstractmethod
    async def retrieve(self, id: int) -> Optional[Model]:
        """
        Retrieve a record by its ID.

        Args:
            id (int): The ID of the record to retrieve.

        Returns:
            Optional[Model]: The retrieved record or None if not found.
        """

        raise NotImplementedError


class ICreateMixin(Generic[Model, CreateModel], ABC):
    """
    Interface for create mixin.
    """

    @abstractmethod
    async def create(self, data: CreateModel) -> Model:
        """
        Create a new record and return it.

        Args:
            data (CreateModel): The data to create the record.

        Returns:
            Model: The created record.
        """

        raise NotImplementedError


class IUpdateMixin(Generic[Model, UpdateModel], ABC):
    """
    Interface for update mixin.
    """

    @abstractmethod
    async def update(self, id: int, data: UpdateModel) -> Optional[Model]:
        """
        Update a record by its ID.

        Args:
            id (int): The ID of the record to update.
            data (UpdateModel): The data to update the record.

        Returns:
            Optional[Model]: The updated record or None if not found.
        """

        raise NotImplementedError


class IDeleteMixin(ABC):
    """
    Interface for delete mixin.
    """
    
    @abstractmethod
    async def delete(self, id: int) -> None:
        """
        Delete a record by its ID.

        Args:
            id (int): The ID of the record to delete.
        """

        raise NotImplementedError
