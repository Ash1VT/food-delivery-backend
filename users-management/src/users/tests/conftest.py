import pytest
from users.managers import UserManager
from users.models import User


@pytest.fixture
def user_manager():
    user_manager = UserManager()
    user_manager.model = User
    return user_manager
