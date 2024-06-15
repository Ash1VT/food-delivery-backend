from pydantic import BaseModel, Field

__all__ = [
    "RestaurantManagerCreatedSchema",
    "ModeratorCreatedSchema"
]


class RestaurantManagerCreatedSchema(BaseModel):
    """
    Schema class for output representation of a created restaurant manager.
    """

    id: int = Field(ge=0)


class ModeratorCreatedSchema(BaseModel):
    """
    Schema class for output representation of a created restaurant manager.
    """

    id: int = Field(ge=0)


class RestaurantRatingUpdatedSchema(BaseModel):
    """
    Schema class for output representation of an updated rating of a restaurant.
    """

    id: int = Field(ge=0)
    rating: float
    reviews_count: int
