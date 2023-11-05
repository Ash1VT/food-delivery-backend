from django.db import models


class UserRole(models.TextChoices):
    CUSTOMER = 'CU', 'Customer'
    COURIER = 'CO', 'Courier'
    RESTAURANT_MANAGER = 'RM', 'Restaurant Manager'
    MODERATOR = 'MO', 'Moderator'
