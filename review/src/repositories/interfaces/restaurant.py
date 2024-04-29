from abc import ABC, abstractmethod
from typing import Optional

from models.restaurant import RestaurantModel, RestaurantCreateModel


class IRestaurantRepository(ABC):
    """
    Interface for restaurant repository.
    """

    @abstractmethod
    def retrieve(self, id: int) -> Optional[RestaurantModel]:
        """
        Retrieve a restaurant by its ID.

        Args:
            id (int): The ID of the restaurant to retrieve.

        Returns:
            Optional[RestaurantModel]: The retrieved restaurant or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    def create(self, restaurant: RestaurantCreateModel) -> RestaurantModel:
        """
        Create a new restaurant and return it.

        Args:
            restaurant (RestaurantCreateModel): The restaurant to create.

        Returns:
            RestaurantModel: The created restaurant.
        """

        raise NotImplementedError

    @abstractmethod
    def delete(self, id: int) -> None:
        """
        Delete a restaurant by its ID.

        Args:
            id (int): The ID of the restaurant to delete.
        """

        raise NotImplementedError
