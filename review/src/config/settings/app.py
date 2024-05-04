from typing import Dict, List, Type, Callable

from pydantic_settings import BaseSettings

from kafka_files.consumer.events import CustomerUpdatedEvent, CustomerCreatedEvent, CourierCreatedEvent, \
    MenuItemCreatedEvent, MenuItemDeletedEvent, RestaurantCreatedEvent, OrderCreatedEvent, ConsumerEvent
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
    kafka_consumer_topic_events: Dict[str, List[Type[ConsumerEvent]]] = {
        'user_review': [
            CourierCreatedEvent,
            CustomerCreatedEvent,
            CustomerUpdatedEvent
        ],
        'menu_review': [
            MenuItemCreatedEvent,
            MenuItemDeletedEvent
        ],
        'restaurant_review': [
            RestaurantCreatedEvent
        ],
        'order_review': [
            OrderCreatedEvent
        ]
    }

    kafka_producer_events_topics: Dict[str, Dict[str, str]] = {}
