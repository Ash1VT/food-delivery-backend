import logging

from django.core.mail import EmailMessage
from django.template.loader import get_template
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.conf import settings

from tokens.generators import email_verification_token_generator
from users.models import User

logger = logging.getLogger(__name__)


def send_verification_email(user: User):
    """
    Send a verification email to the user with instructions on how to verify their account.

    Args:
        user (User): The user for whom to send the verification email.
    """

    try:

        verification_url = generate_email_verification_url(user)
        company_name = settings.COMPANY_NAME

        message = get_template("email_verification.html").render({
            'first_name': user.user_profile.first_name,
            'last_name': user.user_profile.last_name,
            'company_name': company_name,
            'verification_url': verification_url
        })

        mail = EmailMessage(
            subject="Email verification",
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
        )
        mail.content_subtype = 'html'
        mail.send()

        logger.info(f"Verification email sent to user: {user}")

    except Exception as e:
        logger.error(f"Error sending verification email to user: {user}. Error: {str(e)}")


def generate_email_verification_url(user: User) -> str:
    """
    Generate a valid URL for email verification of the given user.

    Args:
        user (User): The user for whom to generate the verification URL.

    Returns:
        str: The verification URL as a string.
    """
    try:
        host = settings.WEB_APP_URL
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verification_token = email_verification_token_generator.make_token(user)
        verification_url = f"{host}{reverse('verify_user_email', args=[uid, verification_token])}"

        logger.debug(f"Verification URL generated for user: {user}. URL: {verification_url}")

        return verification_url

    except Exception as e:
        logger.error(f"Error generating verification URL for user: {user}. Error: {str(e)}")
        raise
