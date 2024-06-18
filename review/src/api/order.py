from typing import Optional

from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies.services import get_review_service
from dependencies.uow import get_uow, get_uow_with_commit
from schemas.review import ReviewCreateInSchema, ReviewCreateOutSchema, ReviewRetrieveOutSchema
from services.interfaces.review import IReviewService
from uow.generic import GenericUnitOfWork

router = APIRouter(
    prefix='/orders'
)


@router.get('/{order_id}/review', response_model=Optional[ReviewRetrieveOutSchema])
@handle_app_errors
async def get_order_review(order_id: int,
                           review_service: IReviewService = Depends(get_review_service),
                           uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.get_order_review(order_id, uow)


@router.post('/{order_id}/reviews', response_model=ReviewCreateOutSchema)
@handle_app_errors
async def add_order_review(order_id: int,
                           review: ReviewCreateInSchema,
                           review_service: IReviewService = Depends(get_review_service),
                           uow: GenericUnitOfWork = Depends(get_uow_with_commit)):
    return await review_service.add_order_review(order_id, review, uow)
