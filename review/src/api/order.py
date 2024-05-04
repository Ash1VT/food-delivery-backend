from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies.services import get_review_service
from dependencies.uow import get_uow
from schemas.review import ReviewCreateInSchema, ReviewCreateOutSchema
from services.interfaces.review import IReviewService
from uow.generic import GenericUnitOfWork

router = APIRouter(
    prefix='/orders'
)


@router.post('/{order_id}/reviews', response_model=ReviewCreateOutSchema)
@handle_app_errors
async def add_order_review(order_id: int,
                           review: ReviewCreateInSchema,
                           review_service: IReviewService = Depends(get_review_service),
                           uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.add_order_review(order_id, review, uow)
