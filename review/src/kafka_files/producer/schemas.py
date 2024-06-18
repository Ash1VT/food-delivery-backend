from pydantic import BaseModel, Field

__all__ = [
    "RestaurantRatingUpdatedSchema",
    "MenuItemRatingUpdatedSchema",
]


class RestaurantRatingUpdatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when restaurant is created
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    rating: float
    reviews_count: int


class MenuItemRatingUpdatedSchema(BaseModel):
    """
    Schema class for output representation of an updated rating of a menu item.
    """

    id: int = Field(ge=0)
    rating: float
    reviews_count: int
