from typing import List, Optional

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, Query

from dependencies import get_uow, get_uow_with_commit, get_restaurant_service
from schemas.application import RestaurantApplicationCreateOut
from schemas.pagination import PaginatedResponse
from schemas.restaurant import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantUpdateIn, RestaurantUpdateOut
from services import RestaurantService
from uow import SqlAlchemyUnitOfWork
from decorators import handle_app_errors

router = APIRouter(
    prefix='/restaurants'
)


@router.get('/', response_model=PaginatedResponse[RestaurantRetrieveOut])
@handle_app_errors
async def get_all_restaurants(service: RestaurantService = Depends(get_restaurant_service),
                              uow: SqlAlchemyUnitOfWork = Depends(get_uow),
                              name: Optional[str] = Query(default=None),
                              address: Optional[str] = Query(default=None),
                              order_by_rating: Optional[bool] = Query(default=False),
                              limit: int = Query(100, ge=1),
                              offset: int = Query(0, ge=0)):
    return await service.list(uow, name=name, address=address, order_by_rating=order_by_rating, limit=limit, offset=offset)


@router.get('/current/', response_model=RestaurantRetrieveOut | None)
@handle_app_errors
async def get_current_restaurant(service: RestaurantService = Depends(get_restaurant_service),
                                 uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await service.retrieve_current_restaurant(uow)


@router.get('/{restaurant_id}/', response_model=RestaurantRetrieveOut)
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


@router.put('/{restaurant_id}/', response_model=RestaurantApplicationCreateOut)
@handle_app_errors
async def update_restaurant(restaurant_id: int,
                            restaurant: RestaurantUpdateIn,
                            service: RestaurantService = Depends(get_restaurant_service),
                            uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.update(restaurant_id, restaurant, uow)


@router.patch('/{restaurant_id}/activate/', response_model=RestaurantUpdateOut)
@handle_app_errors
async def activate_restaurant(restaurant_id: int,
                              service: RestaurantService = Depends(get_restaurant_service),
                              uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.activate_restaurant(restaurant_id, uow)


@router.patch('/{restaurant_id}/deactivate/', response_model=RestaurantUpdateOut)
@handle_app_errors
async def deactivate_restaurant(restaurant_id: int,
                                service: RestaurantService = Depends(get_restaurant_service),
                                uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    return await service.deactivate_restaurant(restaurant_id, uow)


@router.put('/{restaurant_id}/image/', response_model=RestaurantUpdateOut)
@handle_app_errors
async def upload_restaurant_image(restaurant_id: int,
                                  image: UploadFile = File(...),
                                  service: RestaurantService = Depends(get_restaurant_service),
                                  uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    # Check if the uploaded file is an image
    if not image.content_type.startswith('image'):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    return await service.upload_image(restaurant_id, image, uow)
