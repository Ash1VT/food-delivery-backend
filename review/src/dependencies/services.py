from typing import Optional

from fastapi import Depends, Cookie

from authenticate import authenticate
from config.settings.app import AppSettings
from models.courier import CourierModel
from models.customer import CustomerModel
from services.interfaces.review import IReviewService
from services.review import ReviewService
from setup.grpc import grpc_roles_client
from setup.settings.app import get_app_settings
from uow.generic import GenericUnitOfWork
from .uow import get_uow

__all__ = [
    "get_review_service",
]


async def get_review_service(access_token: Optional[str] = Cookie(default=None),
                             uow: GenericUnitOfWork = Depends(get_uow),
                             settings: AppSettings = Depends(get_app_settings)) -> IReviewService:
    """
    Dependency for retrieving the review service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (GenericUnitOfWork): The unit of work for accessing the database.
        settings (AppSettings): The application settings.

    Returns:
        IReviewService: The review service.
    """

    user = await authenticate(access_token, uow, grpc_roles_client, settings.app_roles)
    if isinstance(user, CustomerModel):
        return ReviewService(customer=user)
    if isinstance(user, CourierModel):
        return ReviewService(courier=user)
    return ReviewService()
