from uow import SqlAlchemyUnitOfWork
from utils.uow import get_sqlalchemy_uow, uow_transaction, uow_transaction_with_commit

__all__ = [
    "get_uow",
    "get_uow_with_commit",
]


async def get_uow() -> SqlAlchemyUnitOfWork:
    """
    Dependency for retrieving the unit of work.

    Yields:
        SqlAlchemyUnitOfWork: An instance of the SqlAlchemyUnitOfWork class.
    """

    uow = get_sqlalchemy_uow()
    async with uow_transaction(uow) as uow:
        yield uow


async def get_uow_with_commit() -> SqlAlchemyUnitOfWork:
    """
    Dependency for retrieving the unit of work and committing the changes.

    Yields:
        SqlAlchemyUnitOfWork: An instance of the SqlAlchemyUnitOfWork class.
    """

    uow = get_sqlalchemy_uow()
    async with uow_transaction_with_commit(uow) as uow:
        yield uow
