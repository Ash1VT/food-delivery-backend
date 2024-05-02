from typing import Dict, List, Type, Callable

from pydantic_settings import BaseSettings

from roles import CustomerRole, CourierRole, UserRole
from setup.sqlalchemy.uow import get_sqlalchemy_uow
from uow.generic import GenericUnitOfWork


class AppSettings(BaseSettings):
    app_roles: List[Type[UserRole]] = [
        CustomerRole,
        CourierRole,
    ]
    get_app_uow: Callable[[], GenericUnitOfWork] = get_sqlalchemy_uow
    kafka_group_consumers_count: int = 1
    kafka_consumer_topic_events: Dict[str, List[str]] = {
        'user_restaurant': [
            'consumer.events.RestaurantManagerCreatedEvent',
            'consumer.events.ModeratorCreatedEvent',
        ]
    }

    kafka_producer_events_topics: Dict[str, Dict[str, str]] = {
        'producer.events.RestaurantActivatedEvent': {
            'menu_restaurant': 'producer.schemas.RestaurantActivatedSchema',
        },
        'producer.events.RestaurantDeactivatedEvent': {
            'menu_restaurant': 'producer.schemas.RestaurantDeactivatedSchema'
        },
        'producer.events.RestaurantApplicationConfirmedEvent': {
            'menu_restaurant': 'producer.schemas.RestaurantApplicationConfirmedSchema'
        },
    }
