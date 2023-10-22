from contextlib import asynccontextmanager
from uow import GenericUnitOfWork

__all__ = [
    'uow_transaction',
    'uow_transaction_with_commit',
]


@asynccontextmanager
async def uow_transaction(uow: GenericUnitOfWork):
    """
    Context manager for a unit of work (UOW) transaction.

    This context manager starts a transaction using the provided unit of work (UOW). It automatically commits
    the transaction when the context is exited. If an exception is raised within the context, the transaction
    will be rolled back.

    Args:
        uow (GenericUnitOfWork): The unit of work instance.

    Yields:
        GenericUnitOfWork: The unit of work instance.

    Example:
        async with uow_transaction(uow_instance) as uow:
            # Perform database operations within the transaction
    """

    async with uow:
        yield uow


@asynccontextmanager
async def uow_transaction_with_commit(uow: GenericUnitOfWork):
    """
    Context manager for a unit of work (UOW) transaction with manual commit.

    This context manager starts a transaction using the provided unit of work (UOW). It yields the UOW instance,
    allowing you to perform database operations within the transaction. After the context is exited, the
    transaction is committed. If an exception is raised within the context, the transaction will be
    rolled back.

    Args:
        uow (GenericUnitOfWork): The unit of work instance.

    Yields:
        GenericUnitOfWork: The unit of work instance.

    Example:
        async with uow_transaction_with_commit(uow_instance) as uow:
            # Perform database operations within the transaction
        # Everything will be commited after finishing transaction
    """

    async with uow:
        yield uow
        await uow.commit()
