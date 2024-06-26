from abc import ABC
from typing import Optional

from models.rating import RatingModel
from models.restaurant import RestaurantModel, RestaurantCreateModel, RestaurantUpdateModel
from repositories.interfaces.mixins import IRetrieveMixin, ICreateMixin, IDeleteMixin, IUpdateMixin


class IRestaurantRepository(IRetrieveMixin[RestaurantModel],
                            ICreateMixin[RestaurantModel, RestaurantCreateModel],
                            IUpdateMixin[RestaurantModel, RestaurantUpdateModel],
                            IDeleteMixin,
                            ABC):
    """
    Interface for restaurant repository.
    """

    async def retrieve_restaurant_rating(self, restaurant_id: int) -> Optional[RatingModel]:
        """
        Retrieve restaurant rating.

        Args:
            restaurant_id (int): The ID of the restaurant.

        Returns:
            Optional[RatingModel]: The restaurant rating or None if not found.
        """

        raise NotImplementedError
