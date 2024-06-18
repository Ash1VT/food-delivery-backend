from pydantic.dataclasses import dataclass


@dataclass
class RatingModel:
    id: int
    rating: float
    reviews_count: int
