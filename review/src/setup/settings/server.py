import os

from config.cache import config_cache
from config.settings.server import ProductionServerSettings, TestServerSettings, DevelopServerSettings


@config_cache
def get_server_settings():
    config = os.environ.get("CONFIGURATION", "Develop")

    if config == "Develop":
        return DevelopServerSettings()

    if config == "Test":
        return TestServerSettings()

    if config == "Production":
        return ProductionServerSettings()

    return DevelopServerSettings()
