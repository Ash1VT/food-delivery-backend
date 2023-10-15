import grpc
from typing import Optional

from fastapi import Cookie, HTTPException, Depends

from models import RestaurantManager, Moderator
from db import async_session_maker
from uow import SqlAlchemyUnitOfWork
from grpc_files import grpc_permissions_client
from utils import uow_transaction, uow_transaction_with_commit, grpc_status_to_http

__all__ = [
    "get_uow",
    "get_uow_with_commit",
    "get_restaurant_manager",
    "get_moderator",
]


async def get_uow() -> SqlAlchemyUnitOfWork:
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    async with uow_transaction(uow) as uow:
        yield uow


async def get_uow_with_commit() -> SqlAlchemyUnitOfWork:
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    async with uow_transaction_with_commit(uow) as uow:
        yield uow


async def get_restaurant_manager(access_token: str = Cookie(),
                                 uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> Optional[RestaurantManager]:
    try:
        response = grpc_permissions_client.check_restaurant_manager_permission(access_token)
        if not response.has_permission:
            raise HTTPException(status_code=403, detail="User hasn't got restaurant manager permissions")
        return await uow.managers.retrieve(response.user_id)
    except grpc.RpcError as e:
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )


async def get_moderator(access_token: str = Cookie(),
                        uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> Optional[Moderator]:
    try:
        response = grpc_permissions_client.check_moderator_permission(access_token)
        if not response.has_permission:
            raise HTTPException(status_code=403, detail="User hasn't got moderator permissions")
        return await uow.moderators.retrieve(response.user_id)
    except grpc.RpcError as e:
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )
