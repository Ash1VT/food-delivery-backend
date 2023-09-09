from fastapi import APIRouter
from .item import router as item_router
from .menu import router as menu_router
from .restaurant import router as restaurant_router
from .category import router as category_router

api_router = APIRouter(prefix='/api/v1')

api_router.include_router(item_router)
api_router.include_router(category_router)
api_router.include_router(menu_router)
api_router.include_router(restaurant_router)
