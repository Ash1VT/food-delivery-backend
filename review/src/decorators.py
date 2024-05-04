from functools import wraps

from fastapi import HTTPException
from loguru import logger

from exceptions.base import AppError


def handle_app_errors(controller_func):
    """
    Decorator for handling application errors.

    Args:
        controller_func (Callable): The controller function.
    """

    @wraps(controller_func)
    async def wrapper(*args, **kwargs):
        try:
            return await controller_func(*args, **kwargs)
        except AppError as e:
            raise HTTPException(status_code=e.status_code, detail=e.message)
        except Exception as e:
            logger.critical(f"Unexpected error: {e}")

    return wrapper
