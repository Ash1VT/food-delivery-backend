from typing import List

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException

from dependencies import get_uow, get_uow_with_commit, get_restaurant_service
from schemas.application import RestaurantApplicationCreateOut
from schemas.restaurant import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantUpdateIn
from services import RestaurantService
from uow import SqlAlchemyUnitOfWork
from decorators import handle_app_errors

router = APIRouter(
    prefix='/restaurants'
)


@router.get('/', response_model=List[RestaurantRetrieveOut])
@handle_app_errors
async def get_all_restaurants(service: RestaurantService = Depends(get_restaurant_service),
                              uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await service.list(uow)


@router.get('/{restaurant_id}', response_model=RestaurantRetrieveOut)
@handle_app_errors
async def get_restaurant(restaurant_id: int,
                         service: RestaurantService = Depends(get_restaurant_service),
                         uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await service.retrieve(restaurant_id, uow)


@router.post('/', response_model=RestaurantApplicationCreateOut)
@handle_app_errors
async def create_restaurant(restaurant: RestaurantCreateIn,
                            service: RestaurantService = Depends(get_restaurant_service),
                            uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.create(restaurant, uow)


@router.put('/{restaurant_id}', response_model=RestaurantApplicationCreateOut)
@handle_app_errors
async def update_restaurant(restaurant_id: int,
                            restaurant: RestaurantUpdateIn,
                            service: RestaurantService = Depends(get_restaurant_service),
                            uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.update(restaurant_id, restaurant, uow)


@router.patch('/{restaurant_id}/activate')
@handle_app_errors
async def activate_restaurant(restaurant_id: int,
                              service: RestaurantService = Depends(get_restaurant_service),
                              uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await service.activate_restaurant(restaurant_id, uow)
    return {}


@router.patch('/{restaurant_id}/deactivate')
@handle_app_errors
async def deactivate_restaurant(restaurant_id: int,
                                service: RestaurantService = Depends(get_restaurant_service),
                                uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    await service.deactivate_restaurant(restaurant_id, uow)
    return {}


@router.put('/{restaurant_id}/image')
@handle_app_errors
async def upload_restaurant_image(restaurant_id: int,
                                  image: UploadFile = File(...),
                                  service: RestaurantService = Depends(get_restaurant_service),
                                  uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    # Check if the uploaded file is an image
    if not image.content_type.startswith('image'):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    await service.upload_image(restaurant_id, image, uow)
    return {}
