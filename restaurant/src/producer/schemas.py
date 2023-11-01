from pydantic import BaseModel, Field

__all__ = [
    "RestaurantActivatedSchema",
    "RestaurantDeactivatedSchema",
    "RestaurantApplicationConfirmedSchema",
]


class RestaurantActivatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when it is activated
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)


class RestaurantDeactivatedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when it is deactivated
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)


class RestaurantApplicationConfirmedSchema(BaseModel):
    """
    Schema class for output representation of data of restaurant when restaurant application is confirmed
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
