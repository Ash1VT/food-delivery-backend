import pytest
from typing import Callable

from users.models import User, UserProfile, CustomerProfile, CourierProfile
from users.services import UserService
from .utils import validate_user_profile, generate_valid_register_user_data, \
    generate_update_user_data, generate_partial_update_user_data


@pytest.mark.django_db
class TestUserService:

    @pytest.mark.parametrize(
        "create_user, respective_profile",
        [
            (UserService.create_customer, CustomerProfile),
            (UserService.create_courier, CourierProfile),
            (UserService.create_restaurant_manager, None),
            (UserService.create_moderator, None)
        ])
    def test_create_user(self, create_user: Callable[[dict, dict], User], respective_profile):
        user_register_data = generate_valid_register_user_data()
        user_profile_register_data = user_register_data.pop('user_profile')

        # Call the service function
        user_instance = create_user(user_register_data, user_profile_register_data)
        user_profile = user_instance.user_profile

        # Get the user instance from the database
        user_db = User.objects.get(id=user_instance.id)
        user_profile_db = UserProfile.objects.get(user=user_db)

        # Assertions
        assert user_instance == user_db
        assert user_profile == user_profile_db

        if respective_profile:
            respective_profile.objects.filter(user=user_db).exists()

    @pytest.mark.parametrize(
        "user_update_data",
        [
            generate_update_user_data(),
            generate_partial_update_user_data(),
        ])
    def test_update_user(self, customer: User, user_update_data: dict):
        update_profile_data = user_update_data.get('user_profile', None)

        updated_user = UserService.update_user(customer, user_update_data)
        updated_profile = updated_user.user_profile

        # Assert that the user object has been updated
        assert updated_user.email == user_update_data.get('email')

        # Assert that the user profile has been updated
        validate_user_profile(user_profile=updated_profile, user_profile_data=update_profile_data)

    def test_verify_email(self, customer_with_unverified_email: User):
        UserService.verify_email(customer_with_unverified_email)

        assert customer_with_unverified_email.is_email_verified
