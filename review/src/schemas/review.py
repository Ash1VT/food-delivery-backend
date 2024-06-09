from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ReviewBaseSchema(BaseModel):
    """
    Base schema class for a review.
    """

    rating: int = Field(ge=0, le=5, examples=[1, 2, 3, 4, 5])
    comment: Optional[str] = Field(max_length=255, examples=["Good", "Bad"])


class ReviewRetrieveOutSchema(BaseModel):
    """
    Schema class for output representation of a retrieved review.
    """

    id: int = Field(ge=0, examples=[1, 2, 3, 4, 5])
    customer_full_name: str = Field(max_length=255, examples=["John Doe", "Bill Clinton"])
    customer_image_url: Optional[str] = Field(max_length=255, examples=["https://example.com/image.jpg"])
    customer_id: int = Field(ge=0, examples=[1, 2, 3, 4, 5])
    order_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    restaurant_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    menu_item_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    created_at: datetime = Field(examples=[datetime.now()])

    model_config = {
        "from_attributes": True
    }


class ReviewCreateInSchema(ReviewBaseSchema):
    """
    Schema class for input data when creating a review.
    """

    pass
    # customer_id: int = Field(ge=0, examples=[1, 2, 3, 4, 5])
    # order_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    # restaurant_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    # menu_item_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])


class ReviewCreateOutSchema(ReviewRetrieveOutSchema):
    """
    Schema class for output representation after creating a review.
    """

    model_config = {
        "from_attributes": True
    }


class ReviewUpdateInSchema(ReviewBaseSchema):
    """
    Schema class for input data when updating a review.
    """

    pass


class ReviewUpdateOutSchema(ReviewRetrieveOutSchema):
    """
    Schema class for output representation after updating a review.
    """

    model_config = {
        "from_attributes": True
    }
