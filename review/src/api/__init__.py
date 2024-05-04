from fastapi import APIRouter
from .courier import router as courier_router
from .order import router as order_router
from .menu_item import router as menu_item_router
from .restaurant import router as restaurant_router
from .review import router as review_router

api_router = APIRouter(prefix='/api/v1')
api_router.include_router(courier_router)
api_router.include_router(order_router)
api_router.include_router(menu_item_router)
api_router.include_router(restaurant_router)
api_router.include_router(review_router)
