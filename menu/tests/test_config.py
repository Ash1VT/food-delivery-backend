import os
from typing import Type

import pytest

from src.config.settings import Settings, DevelopSettings as SettingsDevelop, \
    TestSettings as SettingsTest, get_settings


class TestSettings:

    @staticmethod
    @pytest.fixture(scope="function")
    def setup():
        if os.getenv("CONFIGURATION"):
            del os.environ["CONFIGURATION"]

    @pytest.mark.usefixtures("setup")
    @pytest.mark.parametrize(
        "settings_name, settings_class",
        [
            ("Develop", SettingsDevelop),
            ("Test", SettingsTest),
            ("Nonexistent", SettingsDevelop)
        ]
    )
    def test_get_settings(self, settings_name: str, settings_class: Type[Settings]):
        os.environ["CONFIGURATION"] = settings_name
        settings = get_settings()
        assert isinstance(settings, settings_class)

    @pytest.mark.usefixtures("setup")
    def test_get_settings_default(self):
        settings = get_settings()
        assert isinstance(settings, SettingsDevelop)
