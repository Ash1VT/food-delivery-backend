from abc import ABC, abstractmethod
from typing import Optional

from models.review import ReviewModel, ReviewCreateModel, ReviewUpdateModel


class IReviewRepository(ABC):
    """
    Interface for review repository.
    """

    @abstractmethod
    def retrieve(self, id: int) -> Optional[ReviewModel]:
        """
        Retrieve a review by its ID.

        Args:
            id (int): The ID of the review to retrieve.

        Returns:
            Optional[ReviewModel]: The retrieved review or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    def create(self, review: ReviewCreateModel) -> ReviewModel:
        """
        Create a new review and return it.

        Args:
            review (ReviewCreateModel): The review to create.

        Returns:
            ReviewModel: The created review.
        """

        raise NotImplementedError

    @abstractmethod
    def update(self, id: int, review: ReviewUpdateModel) -> Optional[ReviewModel]:
        """
        Update a review by its ID.

        Args:
            id (int): The ID of the review to update.
            review (ReviewUpdateModel): The updated review data.

        Returns:
            Optional[ReviewModel]: The updated review or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    def delete(self, id: int) -> None:
        """
        Delete a review by its ID.

        Args:
            id (int): The ID of the review to delete.
        """

        raise NotImplementedError
