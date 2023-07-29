from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from phonenumber_field import modelfields
from .managers import UserManager


class UserRole(models.TextChoices):
    CUSTOMER = 'CU', 'Customer'
    COURIER = 'CO', 'Courier'
    RESTAURANT_MANAGER = 'RM', 'Restaurant Manager'
    MODERATOR = 'MO', 'Moderator'


class User(AbstractBaseUser, PermissionsMixin):
    """User model for authentication without username field"""

    email = models.EmailField(max_length=254, unique=True)

    role = models.CharField(
        max_length=2,
        choices=UserRole.choices
    )

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_email_verified = models.BooleanField(default=False)

    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self):
        return "/users/%i/" % self.pk


class UserProfile(models.Model):
    """Model, which contains common user personal data"""

    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        primary_key=True,
        related_name='user_profile'
    )

    first_name = models.CharField(max_length=254)
    last_name = models.CharField(max_length=254)
    age = models.IntegerField()
    phone = modelfields.PhoneNumberField()
    birth_date = models.DateField()

    def __str__(self):
        return self.user.email


class CustomerProfile(models.Model):
    """Model, which contains customer data"""

    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        primary_key=True,
        related_name='customer_profile'
    )


class CourierProfile(models.Model):
    """Model, which contains courier data"""

    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        primary_key=True,
        related_name='courier_profile'
    )
