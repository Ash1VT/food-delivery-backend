from pydantic import BaseModel, Field

__all__ = [
    "MenuItemCreatedSchema",
]


class MenuItemCreatedSchema(BaseModel):
    """
    Schema class for output representation of data of menu item when it is created
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    name: str = Field(min_length=1, max_length=100)
    image_url: str
    price: int = Field(gt=0)
    restaurant_id: int = Field(ge=0)


class MenuItemUpdatedSchema(BaseModel):
    """
    Schema class for output representation of data of menu item when it is updated
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)
    name: str = Field(min_length=1, max_length=100)
    image_url: str
    price: int = Field(gt=0)


class MenuItemDeletedSchema(BaseModel):
    """
    Schema class for output representation of data of menu item when it is deleted
    to data that will be published to Kafka.
    """

    id: int = Field(ge=0)


class MenuItemCreatedToReviewSchema(BaseModel):
    """
    Schema class for output representation of data of menu item when it is created
    to data that will be published to Kafka for review microservice.
    """

    id: int = Field(ge=0)
