from typing import Generic, TypeVar, List

from pydantic import Field, BaseModel

M = TypeVar('M')


class PaginatedResponse(BaseModel, Generic[M]):
    count: int = Field(description='Number of items returned in the response')
    limit: int = Field(description='Maximum number of items returned in the response')
    offset: int = Field(description='Offset of items returned in the response')
    items: List[M] = Field(description='List of items returned in the response following given criteria')
