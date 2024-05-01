from abc import ABC
from dataclasses import dataclass
from typing import Optional


@dataclass
class ReviewBaseModel(ABC):
    """
    Base model for a review.
    """

    rating: int
    comment: str


@dataclass
class ReviewModel(ReviewBaseModel):
    """
    Model for a review.
    """

    id: int
    customer_id: Optional[int]
    order_id: Optional[int]
    restaurant_id: Optional[int]
    menu_item_id: Optional[int]
    created_at: str


@dataclass
class ReviewCreateModel(ReviewBaseModel):
    """
    Model for creating a review.
    """

    customer_id: Optional[int]
    order_id: Optional[int]
    restaurant_id: Optional[int]
    menu_item_id: Optional[int]


@dataclass
class ReviewUpdateModel(ReviewBaseModel):
    """
    Model for updating a review.
    """

    pass
