import logging

from django.conf import settings

logger = logging.getLogger(__name__)


def init_firebase():
    import firebase_admin
    from firebase_admin import credentials

    cred = credentials.Certificate(f"{settings.BASE_DIR.parent}/key.json")
    firebase_admin.initialize_app(cred, {'storageBucket': settings.FIREBASE_STORAGE_BUCKET})
    logger.info("Firebase initialized")
