import uvicorn
import os

from loguru import logger
from fastapi import Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.session import get_async_session
from src.setup import app


@app.get("/")
async def index(session: AsyncSession = Depends(get_async_session)):
    logger.info("Test log")
    await session.execute(text('SELECT 1'))
    return {"hello_session": session.bind.name}


if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="src.main:app", port=8001, reload=True)
