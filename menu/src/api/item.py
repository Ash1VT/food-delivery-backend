from fastapi import APIRouter, Depends, UploadFile, File, HTTPException

from decorators import handle_app_errors
from dependencies import get_uow_with_commit, get_menu_item_service, get_uow
from schemas.item import MenuItemCreateIn, MenuItemCreateOut, MenuItemUpdateIn, MenuItemUpdateOut, MenuItemRetrieveOut
from services import MenuItemService
from uow import SqlAlchemyUnitOfWork

router = APIRouter(
    prefix='/items'
)


@router.get('/{item_id}/', response_model=MenuItemRetrieveOut)
@handle_app_errors
async def get_item(item_id: int,
                   menu_item_service: MenuItemService = Depends(get_menu_item_service),
                   uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await menu_item_service.retrieve(item_id, uow)


@router.post('/', response_model=MenuItemCreateOut)
@handle_app_errors
async def create_item(menu_item: MenuItemCreateIn,
                      menu_item_service: MenuItemService = Depends(get_menu_item_service),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await menu_item_service.create(menu_item, uow)


@router.put('/{item_id}/', response_model=MenuItemUpdateOut)
@handle_app_errors
async def update_item(item_id: int,
                      menu_item: MenuItemUpdateIn,
                      menu_item_service: MenuItemService = Depends(get_menu_item_service),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await menu_item_service.update(item_id, menu_item, uow)


@router.delete('/{item_id}/')
@handle_app_errors
async def delete_item(item_id: int,
                      menu_item_service: MenuItemService = Depends(get_menu_item_service),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await menu_item_service.delete(item_id, uow)
    return {}


@router.put('/{item_id}/image/', response_model=MenuItemUpdateOut)
@handle_app_errors
async def upload_item_image(item_id: int,
                            image: UploadFile = File(...),
                            menu_item_service: MenuItemService = Depends(get_menu_item_service),
                            uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    # Check if the uploaded file is an image
    if not image.content_type.startswith('image'):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    return await menu_item_service.upload_image(item_id, image, uow)
