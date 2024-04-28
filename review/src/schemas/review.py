from typing import Optional

from pydantic import BaseModel, Field


class ReviewBaseSchema(BaseModel):
    """
    Base schema class for a review.
    """

    rating: int = Field(ge=0, le=5, examples=[1, 2, 3, 4, 5])
    comment: str = Field(max_length=255, examples=["Good", "Bad"])


class ReviewRetrieveOutSchema(BaseModel):
    """
    Schema class for output representation of a retrieved review.
    """

    id: int = Field(ge=0, examples=[1, 2, 3, 4, 5])
    customer_id: int = Field(ge=0, examples=[1, 2, 3, 4, 5])
    courier_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    restaurant_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    menu_item_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    created_at: str = Field(examples=["2022-01-01T00:00:00Z"])

    model_config = {
        "from_attributes": True
    }


class ReviewCreateInSchema(ReviewBaseSchema):
    """
    Schema class for input data when creating a review.
    """

    customer_id: int = Field(ge=0, examples=[1, 2, 3, 4, 5])
    courier_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    restaurant_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])
    menu_item_id: Optional[int] = Field(ge=0, examples=[1, 2, 3, 4, 5])


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
