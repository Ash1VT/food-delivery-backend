import logging

from .models import User, UserRole, UserProfile, CustomerProfile, CourierProfile
from .utils import send_verification_email
from kafka_files.producer import publisher
from kafka_files.producer.events import RestaurantManagerCreatedEvent, ModeratorCreatedEvent

logger = logging.getLogger(__name__)


class UserService:

    @classmethod
    def _create_user_profile(cls, user: User, user_profile_data: dict) -> UserProfile:
        user_profile = UserProfile.objects.create(user=user, **user_profile_data)

        logger.info(f"Created user profile for user: {user}")

        return user_profile

    @classmethod
    def _create_customer_profile(cls, user: User) -> CustomerProfile:
        customer_profile = CustomerProfile.objects.create(user=user)

        logger.info(f"Created customer profile for user: {user}")

        return customer_profile

    @classmethod
    def _create_courier_profile(cls, user: User) -> CourierProfile:
        courier_profile = CourierProfile.objects.create(user=user)

        logger.info(f"Created courier profile for user: {user}")

        return courier_profile

    @classmethod
    def _update_user_profile(cls, user_profile: UserProfile, user_profile_data: dict) -> UserProfile:
        if user_profile_data:
            for key, value in user_profile_data.items():
                setattr(user_profile, key, value)
            user_profile.save()

            logger.info(f"Updated user profile: {user_profile}")

        return user_profile

    @classmethod
    def verify_email(cls, user: User):
        user.is_email_verified = True
        user.save()

        logger.info(f"Email verified for user: {user}")

    @classmethod
    def update_user(cls, user: User, user_data: dict) -> User:
        user_profile_data = user_data.pop('user_profile', None)

        cls._update_user_profile(user.user_profile, user_profile_data)

        for key, value in user_data.items():
            setattr(user, key, value)

        user.save()

        logger.info(f"Updated user: {user}")

        return user

    @classmethod
    def create_customer(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.CUSTOMER)

        logger.info(f"Created customer: {user}")

        cls._create_user_profile(user=user, user_profile_data=user_profile_data)
        cls._create_customer_profile(user=user)
        send_verification_email(user)
        return user

    @classmethod
    def create_courier(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.COURIER)

        logger.info(f"Created courier: {user}")

        cls._create_user_profile(user=user, user_profile_data=user_profile_data)
        cls._create_courier_profile(user=user)
        send_verification_email(user)
        return user

    @classmethod
    def create_restaurant_manager(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.RESTAURANT_MANAGER)

        logger.info(f"Created restaurant manager: {user}")

        cls._create_user_profile(user=user, user_profile_data=user_profile_data)

        publisher.publish(RestaurantManagerCreatedEvent(data={
            'id': user.id
        }))

        return user

    @classmethod
    def create_moderator(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.MODERATOR)

        logger.info(f"Created moderator: {user}")

        cls._create_user_profile(user=user, user_profile_data=user_profile_data)

        publisher.publish(ModeratorCreatedEvent(data={
            'id': user.id
        }))

        return user
