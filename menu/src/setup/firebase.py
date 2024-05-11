from config.directories import BASE_DIRECTORY
from config.settings import Settings


def init_firebase(settings: Settings):
    import firebase_admin
    from firebase_admin import credentials

    cred = credentials.Certificate(f"{BASE_DIRECTORY}/key.json")
    firebase_admin.initialize_app(cred, {'storageBucket': settings.firebase_storage_bucket})
