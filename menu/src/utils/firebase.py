from base64 import b64encode
from typing import Any

from firebase_admin import storage

from config import get_settings
from models import MenuItem, MenuCategory


def upload_to_firebase(folder_path: str, id: int, image_url: str, default_image_url: str, image: Any) -> str:
    bucket = storage.bucket()
    uid = b64encode(str(id).encode('ascii'))
    image_number = 0

    if image_url != default_image_url:
        image_file_name = image_url.split('/')[-1]
        image_number = int(image_file_name.split('.')[0].split('_')[1])
        blob = bucket.blob(f'{folder_path}/{uid}_{image_number}.jpeg')
        blob.delete()
        image_number += 1

    blob = bucket.blob(f'{folder_path}/{uid}_{image_number}.jpeg')
    blob.upload_from_file(image, content_type='image/jpeg')
    blob.make_public()
    return blob.public_url


def upload_menu_item_image_to_firebase(menu_item: MenuItem, image: Any) -> str:
    settings = get_settings()
    return upload_to_firebase('items/images',
                              menu_item.id, menu_item.image_url,
                              settings.default_menu_item_image_url,
                              image)


def upload_menu_category_image_to_firebase(menu_category: MenuCategory, image: Any) -> str:
    settings = get_settings()
    return upload_to_firebase('categories/images',
                              menu_category.id,
                              menu_category.image_url,
                              settings.default_menu_category_image_url,
                              image)
