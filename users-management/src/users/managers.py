from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone

# from .roles import UserRole


class UserManager(BaseUserManager):
    """User model manager for User model with no username field."""

    def _create_user(self, email, password, role, is_active, is_staff, is_superuser, is_email_verified, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            role=role,
            is_staff=is_staff,
            is_active=is_active,
            is_superuser=is_superuser,
            is_email_verified=is_email_verified,
            last_login=now,
            date_joined=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, role, **extra_fields):
        return self._create_user(email, password, role, True, False, False, False, **extra_fields)

    def create_superuser(self, email, password, role, **extra_fields):
        return self._create_user(email, password, role, True, True, True, True, **extra_fields)
