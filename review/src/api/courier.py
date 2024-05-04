from typing import List

from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies.services import get_review_service
from dependencies.uow import get_uow
from schemas.review import ReviewRetrieveOutSchema
from services.interfaces.review import IReviewService
from uow.generic import GenericUnitOfWork

router = APIRouter(
    prefix='/couriers'
)


@router.get('/{courier_id}/reviews', response_model=List[ReviewRetrieveOutSchema])
@handle_app_errors
async def get_courier_reviews(courier_id: int,
                              review_service: IReviewService = Depends(get_review_service),
                              uow: GenericUnitOfWork = Depends(get_uow)):
    return await review_service.get_courier_reviews(courier_id, uow)
