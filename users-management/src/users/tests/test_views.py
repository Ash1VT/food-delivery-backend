import datetime

import pytest
import json

from django.test import Client
from django.urls import reverse
from users.models import User


@pytest.mark.django_db
class TestViews:

    def test_register_customer_view(self, client: Client, user_register_valid_data: dict):
        response = client.post(reverse('register_customer'),
                               data=json.dumps(user_register_valid_data),
                               content_type="application/json")
        assert response.status_code == 201

        user = User.objects.get(email=user_register_valid_data.get('email'))

        # Compare passed data with User model attributes
        assert user.email == user_register_valid_data.get('email')

        # Compare passed profile data with UserProfile model attributes
        user_profile = user.user_profile
        user_profile_data: dict = user_register_valid_data.get('user_profile')

        assert user_profile.first_name == user_profile_data.get('first_name')
        assert user_profile.last_name == user_profile_data.get('last_name')
        assert user_profile.age == int(user_profile_data.get('age'))
        assert user_profile.phone == user_profile_data.get('phone')
        assert user_profile.birth_date == datetime.date.fromisoformat(
            user_profile_data.get('birth_date'))
