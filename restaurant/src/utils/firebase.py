from base64 import b64encode
from typing import Any

from firebase_admin import storage


def upload_to_firebase(restaurant_id: int, image: Any) -> str:
    bucket = storage.bucket()
    uid = b64encode(str(restaurant_id).encode('ascii'))
    blob = bucket.blob(f'restaurants/logos/{uid}.jpeg')
    blob.upload_from_file(image, content_type='image/jpeg')
    blob.make_public()
    return blob.public_url
