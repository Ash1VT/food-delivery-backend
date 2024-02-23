from pydantic import BaseModel, Field

__all__ = [
    "RestaurantCreatedSchema",
    "RestaurantUpdatedSchema"
]


class RestaurantCreatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when restaurant is created
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    restaurant_manager_id: int = Field(ge=0)
    is_active: bool


class RestaurantUpdatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when it is updated
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    is_active: bool
