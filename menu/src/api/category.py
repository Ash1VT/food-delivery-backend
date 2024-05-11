from fastapi import APIRouter, Depends, UploadFile, File, HTTPException

from decorators import handle_app_errors
from dependencies import get_uow_with_commit, get_menu_category_service
from schemas.category import MenuCategoryCreateIn, MenuCategoryCreateOut, MenuCategoryUpdateIn, MenuCategoryUpdateOut
from services import MenuCategoryService
from uow import SqlAlchemyUnitOfWork

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


@router.put('/{category_id}/image')
@handle_app_errors
async def upload_category_image(category_id: int,
                                image: UploadFile = File(...),
                                menu_category_service: MenuCategoryService = Depends(get_menu_category_service),
                                uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    # Check if the uploaded file is an image
    if not image.content_type.startswith('image'):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    await menu_category_service.upload_image(category_id, image, uow)
    return {}
