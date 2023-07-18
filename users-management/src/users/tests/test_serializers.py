import pytest

from users.serializers import UserSerializer
from users.models import User, UserProfile


@pytest.mark.django_db
class TestUserSerializer:

    @pytest.mark.parametrize(
        "user_register_data_name, is_user_serializer_valid_expectation",
        [
            ("user_register_valid_data", True),
            ("user_register_invalid_data", False)
        ]
    )
    def test_create(self, user_register_data_name: str, is_user_serializer_valid_expectation: bool, request):
        # Get fixture value by its name
        user_serializer_data: dict = request.getfixturevalue(user_register_data_name)

        # Check user serializer
        user_serializer = UserSerializer(data=user_serializer_data)
        is_user_serializer_valid = user_serializer.is_valid()

        assert is_user_serializer_valid == is_user_serializer_valid_expectation

        if is_user_serializer_valid:
            # Save user with serializer
            user = user_serializer.save()
            user_profile = user.user_profile

            # Get users from database
            user_db = User.objects.get(id=user.id)
            user_profile_db = UserProfile.objects.get(user=user_db)

            # Ensure that user was created in database
            assert user == user_db
            assert user_profile == user_profile_db
