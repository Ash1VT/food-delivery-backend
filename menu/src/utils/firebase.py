from base64 import b64encode
from typing import Any

from firebase_admin import storage


def upload_to_firebase(folder_path: str, id: int, image: Any) -> str:
    bucket = storage.bucket()
    uid = b64encode(str(id).encode('ascii'))
    blob = bucket.blob(f'{folder_path}/{uid}.jpeg')
    blob.upload_from_file(image, content_type='image/jpeg')
    blob.make_public()
    return blob.public_url


def upload_menu_item_image_to_firebase(id: int, image: Any) -> str:
    return upload_to_firebase('items/images', id, image)


def upload_menu_category_image_to_firebase(id: int, image: Any) -> str:
    return upload_to_firebase('categories/images', id, image)
