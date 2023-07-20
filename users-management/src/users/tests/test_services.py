import pytest

from users.models import User, UserProfile, CustomerProfile, CourierProfile
from users.services import create_customer, create_courier, create_restaurant_manager, create_moderator


@pytest.mark.django_db
class TestServices:

    @pytest.mark.parametrize(
        "create_user, respective_profile",
        [
            (create_customer, CustomerProfile),
            (create_courier, CourierProfile),
            (create_restaurant_manager, None),
            (create_moderator, None)
        ])
    def test_create_user(self, create_user, respective_profile, user_data: dict, user_profile_data: dict):
        # Call the service function
        user_instance = create_user(user_data=user_data, user_profile_data=user_profile_data)
        user_profile = user_instance.user_profile

        # Get the user instance from the database
        user_db = User.objects.get(id=user_instance.id)
        user_profile_db = UserProfile.objects.get(user=user_db)

        # Assertions
        assert user_instance == user_db
        assert user_profile == user_profile_db

        if respective_profile:
            respective_profile.objects.filter(user=user_db).exists()
