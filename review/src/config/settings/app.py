from typing import Dict, List, Type, Callable

from pydantic import BaseModel
from pydantic_settings import BaseSettings

from kafka_files.consumer.events import CustomerUpdatedEvent, CustomerCreatedEvent, CourierCreatedEvent, \
    MenuItemCreatedEvent, MenuItemDeletedEvent, RestaurantCreatedEvent, OrderFinishedEvent, ConsumerEvent
from kafka_files.producer.events import MenuItemRatingUpdatedEvent, ProducerEvent, RestaurantRatingUpdatedEvent
from kafka_files.producer.schemas import MenuItemRatingUpdatedSchema, RestaurantRatingUpdatedSchema
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
            OrderFinishedEvent
        ]
    }

    kafka_producer_events_topics: Dict[Type[ProducerEvent], Dict[str, Type[BaseModel]]] = {
        MenuItemRatingUpdatedEvent: {
            'menu_review': MenuItemRatingUpdatedSchema
        },
        RestaurantRatingUpdatedEvent: {
            'restaurant_review': RestaurantRatingUpdatedSchema
        }
    }
