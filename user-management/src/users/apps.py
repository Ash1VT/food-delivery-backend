from django.apps import AppConfig

from core.firebase import init_firebase
from producer.utils import init_producer_events


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        init_producer_events()
        init_firebase()

