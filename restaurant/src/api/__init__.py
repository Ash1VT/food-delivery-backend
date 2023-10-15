from fastapi import APIRouter
from .application import router as application_router

api_router = APIRouter(prefix='/api/v1')
api_router.include_router(application_router)
