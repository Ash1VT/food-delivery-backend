from abc import ABC, abstractmethod
from typing import List

from schemas.review import ReviewCreateInSchema, ReviewUpdateInSchema, ReviewCreateOutSchema, ReviewUpdateOutSchema, \
    ReviewRetrieveOutSchema
from uow.generic import GenericUnitOfWork


class IReviewService(ABC):

    @abstractmethod
    async def get_courier_reviews(self, courier_id: int, uow: GenericUnitOfWork) -> List[ReviewRetrieveOutSchema]:
        """
        Get all reviews for a courier.

        Args:
            courier_id (int): The ID of the courier.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            List[ReviewRetrieveOutSchema]: The list of reviews.
        """

        raise NotImplementedError

    @abstractmethod
    async def get_restaurant_reviews(self, restaurant_id: int, uow: GenericUnitOfWork) -> List[ReviewRetrieveOutSchema]:
        """
        Get all reviews for a restaurant.

        Args:
            restaurant_id (int): The ID of the restaurant.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            List[ReviewRetrieveOutSchema]: The list of reviews.
        """

        raise NotImplementedError

    @abstractmethod
    async def get_menu_item_reviews(self, menu_item_id: int, uow: GenericUnitOfWork) -> List[ReviewRetrieveOutSchema]:
        """
        Get all reviews for a menu item.

        Args:
            menu_item_id (int): The ID of the menu item.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            List[ReviewRetrieveOutSchema]: The list of reviews.
        """

        raise NotImplementedError

    @abstractmethod
    async def add_order_review(self, order_id: int, review: ReviewCreateInSchema,
                               uow: GenericUnitOfWork) -> ReviewCreateOutSchema:
        """
        Add a new review for an order.

        Args:
            order_id (int): The ID of the order, which was delivered by courier.
            review (ReviewCreateInSchema): The review data.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            ReviewCreateOutSchema: The created review.
        """

        raise NotImplementedError

    @abstractmethod
    async def add_restaurant_review(self, restaurant_id: int, review: ReviewCreateInSchema,
                                    uow: GenericUnitOfWork) -> ReviewCreateOutSchema:
        """
        Add a new review for a restaurant.

        Args:
            restaurant_id (int): The ID of the restaurant.
            review (ReviewCreateInSchema): The review data.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            ReviewCreateOutSchema: The created review.
        """

        raise NotImplementedError

    @abstractmethod
    async def add_menu_item_review(self, menu_item_id: int, review: ReviewCreateInSchema,
                                   uow: GenericUnitOfWork) -> ReviewCreateOutSchema:
        """
        Add a new review for a menu item.

        Args:
            menu_item_id (int): The ID of the menu item.
            review (ReviewCreateInSchema): The review data.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            ReviewCreateOutSchema: The created review.
        """

        raise NotImplementedError

    @abstractmethod
    async def update_review(self, review_id: int, review: ReviewUpdateInSchema,
                            uow: GenericUnitOfWork) -> ReviewUpdateOutSchema:
        """
        Update an existing review.

        Args:
            review_id (int): The ID of the review to update.
            review (ReviewUpdateInSchema): The updated review data.
            uow (GenericUnitOfWork): The unit of work instance.

        Returns:
            ReviewUpdateOutSchema: The updated review.
        """

        raise NotImplementedError

    @abstractmethod
    async def delete_review(self, review_id: int,
                            uow: GenericUnitOfWork) -> None:
        """
        Delete a review.

        Args:
            review_id (int): The ID of the review to delete.
            uow (GenericUnitOfWork): The unit of work instance.
        """

        raise NotImplementedError
