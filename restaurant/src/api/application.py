from typing import Optional, List

from fastapi import APIRouter, Depends, Query

from decorators import handle_app_errors
from dependencies import get_uow, get_uow_with_commit, get_application_service
from models import ApplicationType
from schemas import RestaurantApplicationUpdateIn, RestaurantApplicationUpdateOut, RestaurantApplicationRetrieveOut
from services import RestaurantApplicationService
from uow import SqlAlchemyUnitOfWork

router = APIRouter(
    prefix='/applications'
)


@router.get('/', response_model=List[RestaurantApplicationRetrieveOut])
@handle_app_errors
async def get_restaurant_applications(application_type: Optional[ApplicationType] = Query(default=None, alias="type"),
                                      service: RestaurantApplicationService = Depends(get_application_service),
                                      uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    if application_type is ApplicationType.create:
        return await service.list_create_applications(uow)
    if application_type is ApplicationType.update:
        return await service.list_update_applications(uow)
    return await service.list(uow)


@router.get('/current/', response_model=List[RestaurantApplicationRetrieveOut])
@handle_app_errors
async def get_current_restaurant_applications(service: RestaurantApplicationService = Depends(get_application_service),
                                              uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await service.list_current_restaurant_manager_applications(uow)


@router.post('/{application_id}/confirm')
@handle_app_errors
async def confirm_application(application_id: int,
                              service: RestaurantApplicationService = Depends(get_application_service),
                              uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await service.confirm_application(id=application_id, uow=uow)
    return {}


@router.delete('/{application_id}/decline')
@handle_app_errors
async def decline_application(application_id: int,
                              service: RestaurantApplicationService = Depends(get_application_service),
                              uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await service.decline_application(id=application_id, uow=uow)
    return {}


@router.put('/{application_id}', response_model=RestaurantApplicationUpdateOut)
@handle_app_errors
async def update_application(application_id: int,
                             application: RestaurantApplicationUpdateIn,
                             service: RestaurantApplicationService = Depends(get_application_service),
                             uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.update(id=application_id, item=application, uow=uow)
