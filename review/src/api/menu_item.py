from typing import List, Optional

from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies.services import get_review_service
from dependencies.uow import get_uow
from schemas.review import ReviewRetrieveOutSchema, ReviewCreateOutSchema, ReviewCreateInSchema
from services.interfaces.review import IReviewService
from uow.generic import GenericUnitOfWork

router = APIRouter(
    prefix='/items'
)


@router.get('/{menu_item_id}/reviews/current/', response_model=Optional[ReviewRetrieveOutSchema])
@handle_app_errors
async def get_customer_menu_item_review(menu_item_id: int,
                                       review_service: IReviewService = Depends(get_review_service),
                                       uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.get_customer_menu_item_review(menu_item_id, uow)


@router.get('/{menu_item_id}/reviews', response_model=List[ReviewRetrieveOutSchema])
@handle_app_errors
async def get_menu_item_reviews(menu_item_id: int,
                                review_service: IReviewService = Depends(get_review_service),
                                uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.get_menu_item_reviews(menu_item_id, uow)


@router.post('/{menu_item_id}/reviews', response_model=ReviewCreateOutSchema)
@handle_app_errors
async def add_menu_item_review(menu_item_id: int,
                               review: ReviewCreateInSchema,
                               review_service: IReviewService = Depends(get_review_service),
                               uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.add_menu_item_review(menu_item_id, review, uow)
