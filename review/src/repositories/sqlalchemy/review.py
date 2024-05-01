from dataclasses import asdict
from typing import Optional, List

from sqlalchemy import Delete, delete, update, insert, Insert, Update, Select, select

from db.sqlalchemy.models import Review, Order
from models.review import ReviewUpdateModel, ReviewModel, ReviewCreateModel
from repositories.interfaces.review import IReviewRepository
from repositories.sqlalchemy.base import SqlAlchemyRepository
from repositories.sqlalchemy.mappers import to_review_model


class ReviewRepository(IReviewRepository, SqlAlchemyRepository):
    """
    SQLAlchemy implementation of the review repository.
    """

    def _get_retrieve_stmt(self, id: int) -> Select:
        """
        Create a SELECT statement to retrieve a review by its ID.

        Args:
            id (int): The ID of the review to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the review.
        """

        return select(Review).where(Review.id == id)

    def _get_list_courier_reviews_stmt(self, courier_id: int) -> Select:
        """
        Create a SELECT statement to list all reviews for a courier.

        Args:
            courier_id (int): The ID of the courier.

        Returns:
            Select: The SELECT statement to list the reviews.
        """

        return select(Review).join(Order).where(Order.courier_id == courier_id)

    def _get_list_restaurant_reviews_stmt(self, restaurant_id: int) -> Select:
        """
        Create a SELECT statement to list all reviews for a restaurant.

        Args:
            restaurant_id (int): The ID of the restaurant.

        Returns:
            Select: The SELECT statement to list the reviews.
        """

        return select(Review).where(Review.restaurant_id == restaurant_id)

    def _get_list_menu_item_reviews_stmt(self, menu_item_id: int) -> Select:
        """
        Create a SELECT statement to list all reviews for a menu item.

        Args:
            menu_item_id (int): The ID of the menu item.

        Returns:
            Select: The SELECT statement to list the reviews.
        """

        return select(Review).where(Review.menu_item_id == menu_item_id)

    def _get_create_stmt(self, review: ReviewCreateModel) -> Insert:
        """
        Create an INSERT statement to add a new review.

        Args:
            review (ReviewCreateModel): The dataclass containing the data to add.

        Returns:
            Insert: The INSERT statement to add the new review.
        """

        return insert(Review).values(asdict(review)).returning(Review)

    def _get_update_stmt(self, id: int, review: ReviewUpdateModel) -> Update:
        """
        Create an UPDATE statement to modify an existing review by its ID.

        Args:
            id (int): The ID of the review to update.
            review (ReviewUpdateModel): A dataclass containing the updated data.

        Returns:
            Update: The UPDATE statement to modify the existing review.
        """

        return update(Review).where(Review.id == id).values(asdict(review)).returning(Review)

    def _get_delete_stmt(self, id: int) -> Delete:
        """
        Create a DELETE statement to remove a review by its ID.

        Args:
            id (int): The ID of the review to delete.

        Returns:
            Delete: The DELETE statement to remove the review.
        """

        return delete(Review).where(Review.id == id)

    async def retrieve(self, id: int) -> Optional[ReviewModel]:
        stmt = self._get_retrieve_stmt(id)
        result = await self._session.execute(stmt)
        review = result.scalar_one_or_none()
        if review:
            return to_review_model(review)

    async def list_courier_reviews(self, courier_id: int) -> List[ReviewModel]:
        stmt = self._get_list_courier_reviews_stmt(courier_id)
        result = await self._session.execute(stmt)
        reviews = result.scalars().all()
        return [to_review_model(review) for review in reviews]

    async def list_restaurant_reviews(self, restaurant_id: int) -> List[ReviewModel]:
        stmt = self._get_list_restaurant_reviews_stmt(restaurant_id)
        result = await self._session.execute(stmt)
        reviews = result.scalars().all()
        return [to_review_model(review) for review in reviews]

    async def list_menu_item_reviews(self, menu_item_id: int) -> List[ReviewModel]:
        stmt = self._get_list_menu_item_reviews_stmt(menu_item_id)
        result = await self._session.execute(stmt)
        reviews = result.scalars().all()
        return [to_review_model(review) for review in reviews]

    async def create(self, review: ReviewCreateModel) -> ReviewModel:
        stmt = self._get_create_stmt(review)
        result = await self._session.execute(stmt)
        review = result.scalar_one()
        return to_review_model(review)

    async def update(self, id: int, review: ReviewUpdateModel) -> Optional[ReviewModel]:
        stmt = self._get_update_stmt(id, review)
        result = await self._session.execute(stmt)
        review = result.scalar_one_or_none()
        if review:
            return to_review_model(review)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)
