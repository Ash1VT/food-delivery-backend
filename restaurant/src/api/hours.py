from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from schemas.hours import WorkingHoursCreateIn, WorkingHoursCreateOut, WorkingHoursUpdateIn, WorkingHoursUpdateOut
from services import WorkingHoursService
from uow import SqlAlchemyUnitOfWork
from dependencies import get_working_hours_service, get_uow, get_uow_with_commit

router = APIRouter(
    prefix='/hours'
)


@router.post('/', response_model=WorkingHoursCreateOut)
@handle_app_errors
async def create_working_hours(hours: WorkingHoursCreateIn,
                               service: WorkingHoursService = Depends(get_working_hours_service),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.create(hours, uow)


@router.put('/{hours_id}', response_model=WorkingHoursUpdateOut)
@handle_app_errors
async def update_working_hours(hours_id: int,
                               hours: WorkingHoursUpdateIn,
                               service: WorkingHoursService = Depends(get_working_hours_service),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.update(hours_id, hours, uow)


@router.delete('/{hours_id}')
@handle_app_errors
async def delete_working_hours(hours_id: int,
                               service: WorkingHoursService = Depends(get_working_hours_service),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.delete(hours_id, uow)
