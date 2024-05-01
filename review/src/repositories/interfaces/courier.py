from abc import ABC, abstractmethod
from typing import Optional

from models.courier import CourierModel, CourierCreateModel


class ICourierRepository(ABC):
    """
    Interface for courier repository.
    """

    @abstractmethod
    async def retrieve(self, id: int) -> Optional[CourierModel]:
        """
        Retrieve a courier by its ID.

        Args:
            id (int): The ID of the courier to retrieve.

        Returns:
            Optional[CourierModel]: The retrieved courier or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def create(self, courier: CourierCreateModel) -> CourierModel:
        """
        Create a new courier and return it.

        Args:
            courier (CourierCreateModel): The courier to create.

        Returns:
            CourierModel: The created courier.
        """

        raise NotImplementedError

    @abstractmethod
    async def delete(self, id: int) -> None:
        """
        Delete a courier by its ID.

        Args:
            id (int): The ID of the courier to delete.
        """

        raise NotImplementedError
