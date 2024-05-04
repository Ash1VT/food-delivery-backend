from config.cache import config_cache
from config.settings.app import AppSettings


@config_cache
def get_app_settings() -> AppSettings:
    return AppSettings()
