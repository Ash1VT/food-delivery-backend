from abc import ABC

from sqlalchemy.ext.asyncio import AsyncSession


class SqlAlchemyRepository(ABC):
    """
    Base class for sqlalchemy repositories.
    """

    def __init__(self, session: AsyncSession):
        """
        Initialize a new SQLAlchemyRepository instance.

        Args:
            session (AsyncSession): An asynchronous SQLAlchemy session.
        """

        self._session = session
