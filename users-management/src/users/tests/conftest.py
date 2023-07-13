import pytest
from django.contrib.auth import get_user_model
from users.managers import UserManager

User = get_user_model()


@pytest.fixture
def user_manager():
    user_manager = UserManager()
    user_manager.model = User
    return user_manager
