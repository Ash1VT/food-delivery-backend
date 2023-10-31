from pydantic import BaseModel, Field

from schemas.restaurant import RestaurantCreateIn
from schemas.manager import RestaurantManagerCreateIn


class RestaurantApplicationConfirmedSchema(RestaurantCreateIn):
    """
    Schema class for output representation of a confirmed restaurant application.
    """

    pass


class RestaurantActivatedSchema(BaseModel):
    """
    Schema class for output representation of an activated restaurant.
    """

    id: int = Field(ge=0)


class RestaurantDeactivatedSchema(BaseModel):
    """
    Schema class for output representation of a deactivated restaurant.
    """

    id: int = Field(ge=0)


class RestaurantManagerCreatedSchema(RestaurantManagerCreateIn):
    """
    Schema class for output representation of a created restaurant manager.
    """

    pass
