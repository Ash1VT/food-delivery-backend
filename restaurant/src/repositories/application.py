from sqlalchemy import select

from models import RestaurantApplication, ApplicationType

from .generic import SQLAlchemyRepository

__all__ = ["RestaurantApplicationRepository"]


class RestaurantApplicationRepository(SQLAlchemyRepository[RestaurantApplication]):
    """Repository for RestaurantApplication model operations."""

    model = RestaurantApplication

    def _get_list_create_applications_stmt(self, **kwargs):
        return select(RestaurantApplication).where(RestaurantApplication.application_type == ApplicationType.create)

    def _get_list_update_applications_stmt(self, **kwargs):
        return select(RestaurantApplication).where(RestaurantApplication.application_type == ApplicationType.update)

    async def list_create_applications(self, **kwargs):
        stmt = self._get_list_create_applications_stmt(**kwargs)
        result = await self._session.execute(stmt)
        return [r[0] for r in result.fetchall()]

    async def list_update_applications(self, **kwargs):
        stmt = self._get_list_update_applications_stmt(**kwargs)
        result = await self._session.execute(stmt)
        return [r[0] for r in result.fetchall()]
