from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies import get_uow_with_commit, get_menu_service
from schemas.menu import MenuCreateIn, MenuCreateOut, MenuUpdateIn, MenuUpdateOut
from services import MenuService
from uow import SqlAlchemyUnitOfWork

router = APIRouter(
    prefix='/menus'
)


@router.post('/', response_model=MenuCreateOut)
@handle_app_errors
async def create_menu(menu: MenuCreateIn,
                      menu_service: MenuService = Depends(get_menu_service),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await menu_service.create(menu, uow)


@router.put('/{menu_id}', response_model=MenuUpdateOut)
@handle_app_errors
async def update_menu(menu_id: int,
                      menu: MenuUpdateIn,
                      menu_service: MenuService = Depends(get_menu_service),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await menu_service.update(menu_id, menu, uow)


@router.delete('/{menu_id}')
@handle_app_errors
async def delete_menu(menu_id: int,
                      menu_service: MenuService = Depends(get_menu_service),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await menu_service.delete(menu_id, uow)
    return {}
