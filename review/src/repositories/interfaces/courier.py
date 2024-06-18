from abc import ABC
from typing import Optional

from models.courier import CourierModel, CourierCreateModel
from models.rating import RatingModel
from repositories.interfaces.mixins import IRetrieveMixin, ICreateMixin, IDeleteMixin


class ICourierRepository(IRetrieveMixin[CourierModel],
                         ICreateMixin[CourierModel, CourierCreateModel],
                         IDeleteMixin,
                         ABC):
    """
    Interface for courier repository.
    """

    async def retrieve_courier_rating(self, courier_id: int) -> Optional[RatingModel]:
        """
        Retrieve courier rating.

        Args:
            courier_id (int): The ID of the courier.

        Returns:
            Optional[RatingModel]: The courier rating or None if not found.
        """

        raise NotImplementedError
