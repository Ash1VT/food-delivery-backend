from dataclasses import dataclass
from typing import Generic, TypeVar, List

M = TypeVar('M')


@dataclass
class PaginatedModel(Generic[M]):
    limit: int
    offset: int
    count: int
    items: List[M]
