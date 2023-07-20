import pytest
import abc

from users.serializers import CustomerSerializer, CourierSerializer
from users.models import User, UserProfile, CustomerProfile, CourierProfile


class BaseTestUserSerializer(abc.ABC):
    serializer_class = None
    profile_class = None

    @pytest.mark.parametrize(
        "user_register_data_name, is_user_serializer_valid_expectation",
        [
            ("user_register_valid_data", True),
            ("user_register_invalid_data", False)
        ]
    )
    def test_create(self, user_register_data_name, is_user_serializer_valid_expectation, request):
        # Get fixture value by its name
        user_register_data: dict = request.getfixturevalue(user_register_data_name)

        # Check user serializer
        user_serializer = self.serializer_class(data=user_register_data)
        is_user_serializer_valid = user_serializer.is_valid()

        assert is_user_serializer_valid == is_user_serializer_valid_expectation

        if is_user_serializer_valid:
            user = user_serializer.save()
            user_profile = user.user_profile

            user_db = User.objects.get(id=user.id)
            user_profile_db = UserProfile.objects.get(user=user_db)

            assert user == user_db
            assert user_profile == user_profile_db

            if self.profile_class:
                assert self.profile_class.objects.filter(user=user_db).exists()


@pytest.mark.django_db
class TestCustomerSerializer(BaseTestUserSerializer):
    serializer_class = CustomerSerializer
    profile_class = CustomerProfile


@pytest.mark.django_db
class TestCourierSerializer(BaseTestUserSerializer):
    serializer_class = CourierSerializer
    profile_class = CourierProfile
