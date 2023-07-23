import pytest
import abc

from users.serializers import CustomerPostSerializer, CourierPostSerializer, UserUpdateSerializer, UserOutSerializer, \
    UserUpdateModeratorSerializer, UserOutModeratorSerializer
from users.models import User, UserProfile, CustomerProfile, CourierProfile
from .utils import validate_user_profile, generate_valid_register_user_data, generate_invalid_register_user_data, \
    generate_update_moderator_user_data, generate_partial_update_moderator_user_data


class BaseTestUserSerializer(abc.ABC):
    serializer_class = None
    profile_class = None

    @pytest.mark.parametrize(
        "user_register_data, is_serializer_valid_expectation",
        [
            (generate_valid_register_user_data(), True),
            (generate_invalid_register_user_data(), False)
        ]
    )
    def test_create(self, user_register_data: dict, is_serializer_valid_expectation: bool):

        # Check user serializer
        serializer = self.serializer_class(data=user_register_data)
        is_serializer_valid = serializer.is_valid()

        assert is_serializer_valid == is_serializer_valid_expectation

        if is_serializer_valid:
            user = serializer.save()
            user_profile = user.user_profile

            user_db = User.objects.get(id=user.id)
            user_profile_db = UserProfile.objects.get(user=user_db)

            assert user == user_db
            assert user_profile == user_profile_db

            if self.profile_class:
                assert self.profile_class.objects.filter(user=user_db).exists()


class BaseTestUserUpdateSerializer(abc.ABC):
    user_update_serializer_class = None
    user_out_serializer_class = None

    def test_update(self, customer: User, user_update_data: dict, is_serializer_valid_expectation: bool, request):
        update_profile_data = user_update_data.get('user_profile', None)

        serializer = self.user_update_serializer_class(instance=customer, data=user_update_data)
        is_serializer_valid = serializer.is_valid()

        assert is_serializer_valid == is_serializer_valid_expectation

        if is_serializer_valid:
            updated_user = serializer.save()
            updated_user_profile = updated_user.user_profile

            assert updated_user.email == user_update_data.get('email')

            # Assert that the user profile has been updated
            validate_user_profile(user_profile=updated_user_profile, user_profile_data=update_profile_data)

    def test_to_representation(self, customer: User):
        user_update_serializer = self.user_update_serializer_class()
        user_out_serializer = self.user_out_serializer_class(instance=customer)

        assert user_update_serializer.to_representation(customer) == user_out_serializer.data


@pytest.mark.django_db
class TestCustomerSerializer(BaseTestUserSerializer):
    serializer_class = CustomerPostSerializer
    profile_class = CustomerProfile


@pytest.mark.django_db
class TestCourierSerializer(BaseTestUserSerializer):
    serializer_class = CourierPostSerializer
    profile_class = CourierProfile


@pytest.mark.django_db
class TestUserUpdateSerializer(BaseTestUserUpdateSerializer):
    user_update_serializer_class = UserUpdateSerializer
    user_out_serializer_class = UserOutSerializer

    @pytest.mark.parametrize(
        "user_update_data, is_serializer_valid_expectation",
        [
            (generate_valid_register_user_data(), True),
            (generate_invalid_register_user_data(), False)
        ]
    )
    def test_update(self, customer: User, user_update_data: dict, is_serializer_valid_expectation: bool, request):
        super().test_update(customer, user_update_data, is_serializer_valid_expectation, request)


@pytest.mark.django_db
class TestUserUpdateModeratorSerializer(BaseTestUserUpdateSerializer):
    user_update_serializer_class = UserUpdateModeratorSerializer
    user_out_serializer_class = UserOutModeratorSerializer

    @pytest.mark.parametrize(
        "user_update_data, is_serializer_valid_expectation",
        [
            (generate_update_moderator_user_data(), True),
            (generate_partial_update_moderator_user_data(), False)
        ]
    )
    def test_update(self, customer: User, user_update_data: dict, is_serializer_valid_expectation: bool, request):
        super().test_update(customer, user_update_data, is_serializer_valid_expectation, request)
