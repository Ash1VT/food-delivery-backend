from pydantic import BaseModel


class RatingBaseSchema(BaseModel):
    """
    Base schema for rating
    """

    id: int
    rating: float
    reviews_count: int


class RatingRetrieveOutSchema(RatingBaseSchema):
    """
    Schema for output representation of data of rating
    """

    pass
