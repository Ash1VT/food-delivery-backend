from django.core.mail import EmailMessage
from django.template.loader import get_template
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.conf import settings

from tokens.generators import email_verification_token_generator
from users.models import User


def send_verification_email(user: User):
    """
    Send a verification email to the user with instructions on how to verify their account.

    Args:
        user (User): The user for whom to send the verification email.
    """

    verification_url = generate_email_verification_url(user)

    message = get_template("account_activation_email.html").render({
        'user_name': user.user_profile.first_name,
        'activation_url': verification_url
    })

    mail = EmailMessage(
        subject="Account activation",
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email],
    )
    mail.content_subtype = 'html'
    mail.send()


def generate_email_verification_url(user: User) -> str:
    """
    Generate a valid URL for email verification of the given user.

    Args:
        user (User): The user for whom to generate the verification URL.

    Returns:
        str: The verification URL as a string.
    """

    host = settings.APP_HOST
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verification_token = email_verification_token_generator.make_token(user)
    return f"{host}{reverse('verify_user_email', args=[uid, verification_token])}"
