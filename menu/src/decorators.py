from functools import wraps

from fastapi import HTTPException

from exceptions import AppError

__all__ = [
    'handle_app_errors',
]


def handle_app_errors(controller_func):
    @wraps(controller_func)
    async def wrapper(*args, **kwargs):
        try:
            return await controller_func(*args, **kwargs)
        except AppError as e:
            raise HTTPException(status_code=e.status_code, detail=e.message)

    return wrapper
