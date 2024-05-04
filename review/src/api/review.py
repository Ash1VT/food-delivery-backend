from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies.services import get_review_service
from dependencies.uow import get_uow
from schemas.review import ReviewUpdateOutSchema, ReviewUpdateInSchema
from services.interfaces.review import IReviewService
from uow.generic import GenericUnitOfWork

router = APIRouter(
    prefix='/reviews'
)


@router.put('/{review_id}', response_model=ReviewUpdateOutSchema)
@handle_app_errors
async def update_review(review_id: int,
                        review: ReviewUpdateInSchema,
                        review_service: IReviewService = Depends(get_review_service),
                        uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.update_review(review_id, review, uow)


@router.delete('/{review_id}')
@handle_app_errors
async def delete_review(review_id: int,
                        review_service: IReviewService = Depends(get_review_service),
                        uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.delete_review(review_id, uow)