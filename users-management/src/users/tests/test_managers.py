import pytest
from contextlib import nullcontext as does_not_raise
from users.managers import UserManager
from users.models import User


@pytest.mark.django_db
class TestUserManager:

    @pytest.mark.parametrize(
        "email, password, expectation",
        [
            ("n@gmail.com", "12345", does_not_raise()),
            ("", "12345", pytest.raises(ValueError)),

        ]
    )
    def test_create_user(self, user_manager: UserManager, email: str, password: str, expectation):
        with expectation:
            user = user_manager.create_user(
                email=email,
                password=password)
            user_db = User.objects.get(id=user.id)
            assert user == user_db

    @pytest.mark.parametrize(
        "email, password, expectation",
        [
            ("n@gmail.com", "12345", does_not_raise()),
            ("", "12345", pytest.raises(ValueError))
        ]
    )
    def test_create_superuser(self, user_manager: UserManager, email: str, password: str, expectation):
        with expectation:
            user = user_manager.create_superuser(
                email=email,
                password=password)
            user_db = User.objects.get(id=user.id)
            assert user == user_db
