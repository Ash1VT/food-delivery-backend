from pydantic import BaseModel, Field


class RestaurantCreatedSchema(BaseModel):
    """
    Schema class for output representation of a created restaurant.
    """

    id: int = Field(ge=0)
    restaurant_manager_id: int = Field(ge=0)
    is_active: bool


class RestaurantUpdatedSchema(BaseModel):
    """
    Schema class for output representation of an updated restaurant.
    """

    id: int = Field(ge=0)
    is_active: bool


class RestaurantManagerCreatedSchema(BaseModel):
    """
    Schema class for output representation of a created restaurant manager.
    """

    id: int = Field(ge=0)
