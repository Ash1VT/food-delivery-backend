from fastapi import APIRouter, Depends, Cookie, HTTPException

from dependencies import get_restaurant_manager, get_moderator, get_uow
from grpc_files import grpc_permissions_client
from models import RestaurantManager, Moderator
from services import RestaurantApplicationService, RestaurantService
from uow import SqlAlchemyUnitOfWork

router = APIRouter(
    prefix='/applications'
)


@router.get('/')
async def get_restaurant_applications(access_token: str = Cookie(),
                                      uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    response = grpc_permissions_client.check_restaurant_manager_permission(access_token)
    response_2 = grpc_permissions_client.check_moderator_permission(access_token)
    if response.has_permission:
        manager = await uow.managers.retrieve(response.user_id)
        service = RestaurantService(restaurant_manager=manager)
    elif response_2.has_permission:
        moderator = await uow.moderators.retrieve(response_2.user_id)
        service = RestaurantService(moderator=moderator)
    else:
        raise HTTPException(status_code=403, detail="User hasn't got restaurant manager or moderator permissions")

    return await service.list_instances(uow)



async def confirm_application():
    pass


async def decline_application():
    pass
