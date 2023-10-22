from fastapi import APIRouter, Depends

from dependencies import get_uow_with_commit, get_menu_category_service
from models import RestaurantManager
from schemas.category import MenuCategoryCreateIn, MenuCategoryCreateOut, MenuCategoryUpdateIn, MenuCategoryUpdateOut
from services import MenuCategoryService
from uow import SqlAlchemyUnitOfWork
from decorators import handle_app_errors

router = APIRouter(
    prefix='/categories'
)


@router.post('/', response_model=MenuCategoryCreateOut)
@handle_app_errors
async def create_category(menu_category: MenuCategoryCreateIn,
                          menu_category_service: MenuCategoryService = Depends(get_menu_category_service),
                          uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await menu_category_service.create(menu_category, uow)


@router.put('/{category_id}', response_model=MenuCategoryUpdateOut)
@handle_app_errors
async def update_category(category_id: int,
                          menu_category: MenuCategoryUpdateIn,
                          menu_category_service: MenuCategoryService = Depends(get_menu_category_service),
                          uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await menu_category_service.update(category_id, menu_category, uow)


@router.delete('/{category_id}')
@handle_app_errors
async def delete_category(category_id: int,
                          menu_category_service: MenuCategoryService = Depends(get_menu_category_service),
                          uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await menu_category_service.delete(category_id, uow)
    return {}


@router.post('/{category_id}/items/{item_id}')
@handle_app_errors
async def add_item_to_category(category_id: int,
                               item_id: int,
                               menu_category_service: MenuCategoryService = Depends(get_menu_category_service),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await menu_category_service.add_menu_item(category_id, item_id, uow)
    return {}


@router.delete('/{category_id}/items/{item_id}')
@handle_app_errors
async def remove_item_from_category(category_id: int,
                                    item_id: int,
                                    menu_category_service: MenuCategoryService = Depends(get_menu_category_service),
                                    uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await menu_category_service.remove_menu_item(category_id, item_id, uow)
    return {}
