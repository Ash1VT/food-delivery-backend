from fastapi import APIRouter
from .application import router as application_router
from .restaurant import router as restaurant_router
from .hours import router as hours_router

api_router = APIRouter(prefix='/api/v1')
api_router.include_router(application_router)
api_router.include_router(restaurant_router)
api_router.include_router(hours_router)
