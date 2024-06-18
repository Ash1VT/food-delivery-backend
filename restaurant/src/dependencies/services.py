from typing import Optional

from fastapi import Depends, Cookie

from models import Moderator, RestaurantManager
from services import RestaurantApplicationService, RestaurantService, WorkingHoursService
from authentication import authenticate
from uow import SqlAlchemyUnitOfWork
from .uow import get_uow

__all__ = [
    'get_application_service',
    'get_restaurant_service',
    'get_working_hours_service',
]


async def get_application_service(access_token: Optional[str] = Cookie(default=None),
                                  uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> RestaurantApplicationService:
    """
    Dependency for retrieving the application service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        RestaurantApplicationService: An instance of the RestaurantApplicationService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, Moderator):
        return RestaurantApplicationService(moderator=user)
    if isinstance(user, RestaurantManager):
        return RestaurantApplicationService(restaurant_manager=user)
    return RestaurantApplicationService()


async def get_restaurant_service(access_token: Optional[str] = Cookie(default=None),
                                 uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> RestaurantService:
    """
    Dependency for retrieving the restaurant service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        RestaurantService: An instance of the RestaurantService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return RestaurantService(restaurant_manager=user)
    if isinstance(user, Moderator):
        return RestaurantService(moderator=user)
    return RestaurantService()


async def get_working_hours_service(access_token: Optional[str] = Cookie(default=None),
                                    uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> WorkingHoursService:
    """
    Dependency for retrieving the working hours service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        WorkingHoursService: An instance of the WorkingHoursService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return WorkingHoursService(restaurant_manager=user)
    return WorkingHoursService()
