from sqlalchemy import Select, select, func
from sqlalchemy.ext.asyncio import AsyncSession


async def paginate(query: Select, session: AsyncSession, limit: int, offset: int) -> dict:
    return {
        'count': await session.scalar(select(func.count()).select_from(query.subquery())),
        'items': [todo for todo in await session.scalars(query.limit(limit).offset(offset))]
    }
