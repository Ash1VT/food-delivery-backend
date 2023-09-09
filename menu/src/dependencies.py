import grpc
from fastapi import Cookie, HTTPException, Depends

from decorators import handle_app_errors
from models import RestaurantManager
from db.session import async_session_maker
from uow import SqlAlchemyUnitOfWork
from services import RestaurantManagerService
from grpc_files import grpc_permissions_client
from utils.uow import uow_transaction, uow_transaction_with_commit
from utils.grpc import grpc_status_to_http


async def get_uow() -> SqlAlchemyUnitOfWork:
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    async with uow_transaction(uow) as uow:
        yield uow


async def get_uow_with_commit() -> SqlAlchemyUnitOfWork:
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    async with uow_transaction_with_commit(uow) as uow:
        yield uow


@handle_app_errors
async def get_restaurant_manager(access_token: str = Cookie(),
                                 uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> RestaurantManager:
    try:
        response = grpc_permissions_client.check_restaurant_manager_permission(access_token)
        if not response.has_permission:
            raise HTTPException(status_code=403, detail="User hasn't got restaurant manager permissions")
        return await RestaurantManagerService().retrieve_instance(response.user_id, uow)
    except grpc.RpcError as e:
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )
