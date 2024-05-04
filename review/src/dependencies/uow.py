from fastapi import Depends

from config.settings.app import AppSettings
from setup.settings.app import get_app_settings
from uow.generic import GenericUnitOfWork
from uow.utils import uow_transaction, uow_transaction_with_commit

__all__ = [
    "get_uow",
    "get_uow_with_commit",
]


async def get_uow(settings: AppSettings = Depends(get_app_settings)) -> GenericUnitOfWork:
    """
    Dependency for retrieving the unit of work.

    Yields:
        GenericUnitOfWork: An instance of the GenericUnitOfWork class.
    """

    uow = settings.get_app_uow()
    async with uow_transaction(uow) as uow:
        yield uow


async def get_uow_with_commit(settings: AppSettings = Depends(get_app_settings)) -> GenericUnitOfWork:
    """
    Dependency for retrieving the unit of work and committing the changes.

    Yields:
        GenericUnitOfWork: An instance of the GenericUnitOfWork class.
    """

    uow = settings.get_app_uow()
    async with uow_transaction_with_commit(uow) as uow:
        yield uow
