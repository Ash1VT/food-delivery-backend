from abc import ABC, abstractmethod
from typing import Optional, List

from models.review import ReviewModel, ReviewCreateModel, ReviewUpdateModel
from repositories.interfaces.mixins import IDeleteMixin, IUpdateMixin, ICreateMixin, IRetrieveMixin


class IReviewRepository(IRetrieveMixin[ReviewModel],
                        ICreateMixin[ReviewModel, ReviewCreateModel],
                        IUpdateMixin[ReviewModel, ReviewUpdateModel],
                        IDeleteMixin,
                        ABC):
    """
    Interface for review repository.
    """

    @abstractmethod
    async def retrieve_by_order(self, order_id: int) -> Optional[ReviewModel]:
        """
        Retrieve a review by its order ID.

        Args:
            order_id (int): The ID of the order.

        Returns:
            Optional[ReviewModel]: The retrieved review or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def retrieve_by_customer_and_restaurant(self, customer_id: int, restaurant_id: int) -> Optional[ReviewModel]:
        """
        Retrieve a review by customer and restaurant IDs.

        Args:
            customer_id (int): The ID of the customer.
            restaurant_id (int): The ID of the restaurant.

        Returns:
            Optional[ReviewModel]: The retrieved review or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def retrieve_by_customer_and_menu_item(self, customer_id: int, menu_item_id: int) -> Optional[ReviewModel]:
        """
        Retrieve a review by customer and menu item IDs.

        Args:
            customer_id (int): The ID of the customer.
            menu_item_id (int): The ID of the menu item.

        Returns:
            Optional[ReviewModel]: The retrieved review or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def list_courier_reviews(self, courier_id: int) -> List[ReviewModel]:
        """
        List all reviews for a courier.

        Args:
            courier_id (int): The ID of the courier.

        Returns:
            List[ReviewModel]: The list of reviews.
        """

        raise NotImplementedError

    @abstractmethod
    async def list_restaurant_reviews(self, restaurant_id: int) -> List[ReviewModel]:
        """
        List all reviews for a restaurant.

        Args:
            restaurant_id (int): The ID of the restaurant.

        Returns:
            List[ReviewModel]: The list of reviews.
        """

        raise NotImplementedError

    @abstractmethod
    async def list_menu_item_reviews(self, menu_item_id: int) -> List[ReviewModel]:
        """
        List all reviews for a menu item.

        Args:
            menu_item_id (int): The ID of the menu item.

        Returns:
            List[ReviewModel]: The list of reviews.
        """

        raise NotImplementedError
