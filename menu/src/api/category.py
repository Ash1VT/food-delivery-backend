from fastapi import APIRouter, Depends

from dependencies import get_uow_with_commit, get_restaurant_manager
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
                          restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                          uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_category_service = MenuCategoryService(restaurant_manager)
    return await menu_category_service.create(menu_category, uow)


@router.put('/{category_id}', response_model=MenuCategoryUpdateOut)
@handle_app_errors
async def update_category(category_id: int,
                          menu_category: MenuCategoryUpdateIn,
                          restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                          uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_category_service = MenuCategoryService(restaurant_manager)
    return await menu_category_service.update(category_id, menu_category, uow)


@router.post('/{category_id}/items/{item_id}')
@handle_app_errors
async def add_item_to_category(category_id: int,
                               item_id: int,
                               restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_category_service = MenuCategoryService(restaurant_manager)
    return await menu_category_service.add_menu_item(category_id, item_id, uow)
