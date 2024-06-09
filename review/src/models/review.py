from abc import ABC
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class ReviewBaseModel(ABC):
    """
    Base model for a review.
    """

    rating: int
    comment: Optional[str]


@dataclass
class ReviewModel(ReviewBaseModel):
    """
    Model for a review.
    """

    id: int
    customer_id: int
    customer_full_name: str
    customer_image_url: str
    order_id: Optional[int]
    restaurant_id: Optional[int]
    menu_item_id: Optional[int]
    created_at: datetime


@dataclass
class ReviewCreateModel(ReviewBaseModel):
    """
    Model for creating a review.
    """

    customer_id: int
    order_id: Optional[int] = None
    restaurant_id: Optional[int] = None
    menu_item_id: Optional[int] = None


@dataclass
class ReviewUpdateModel(ReviewBaseModel):
    """
    Model for updating a review.
    """

    pass
