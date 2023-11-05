import pytest
from django.test import Client
from django.core import mail

from users.models import User
from users.utils import send_verification_email, generate_email_verification_url
from .utils import validate_verification_email


@pytest.mark.django_db
class TestUtils:

    def test_send_verification_email(self, verified_customer):
        send_verification_email(verified_customer)

        assert len(mail.outbox) == 1

        email = mail.outbox.pop(0)

        validate_verification_email(verified_customer, email)

    def test_generate_email_verification_url(self, client_unverified_customer_with_all_tokens,
                                             unverified_customer):
        verification_url = generate_email_verification_url(unverified_customer)
        response = client_unverified_customer_with_all_tokens.get(verification_url)

        # Get updated user instance
        user = User.objects.get(id=unverified_customer.id)

        assert response.status_code == 200
        assert user.is_email_verified
