from abc import ABC

from models.restaurant import RestaurantModel, RestaurantCreateModel
from repositories.interfaces.mixins import IRetrieveMixin, ICreateMixin, IDeleteMixin


class IRestaurantRepository(IRetrieveMixin[RestaurantModel],
                            ICreateMixin[RestaurantModel, RestaurantCreateModel],
                            IDeleteMixin,
                            ABC):
    """
    Interface for restaurant repository.
    """

    pass
