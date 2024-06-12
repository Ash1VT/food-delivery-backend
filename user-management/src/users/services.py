import logging

from django.conf import settings

from .models import User, UserRole, UserProfile
from .utils import upload_to_firebase, send_customer_verification_email, send_courier_verification_email, \
    send_restaurant_manager_verification_email
from producer import publisher
from producer.events import CustomerCreatedEvent, CourierCreatedEvent, RestaurantManagerCreatedEvent, \
    ModeratorCreatedEvent, CustomerUpdatedEvent

logger = logging.getLogger(__name__)


class UserService:

    @classmethod
    def _create_user_profile(cls, user: User, user_profile_data: dict) -> UserProfile:
        # image = user_profile_data.pop('image', None)
        #
        # if image:
        #     image_url = upload_to_firebase(user=user, image=image)
        # else:
        image_url = settings.DEFAULT_USER_AVATAR_URL

        user_profile_data['image_url'] = image_url

        user_profile = UserProfile.objects.create(user=user, **user_profile_data)

        logger.info(f"Created user profile for user: {user}")

        return user_profile

    @classmethod
    def _update_user_profile(cls, user: User, user_profile: UserProfile, user_profile_data: dict) -> UserProfile:
        if user_profile_data:
            # image = user_profile_data.pop('image', None)
            #
            # if image:
            #     image_url = upload_to_firebase(user=user, image=image)
            #     user_profile_data['image_url'] = image_url

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
    def create_user(cls, role: UserRole, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=role)

        logger.info(f"Created user: {user}")

        cls._create_user_profile(user=user, user_profile_data=user_profile_data)

        return user

    @classmethod
    def update_user(cls, user: User, user_data: dict) -> User:
        user_profile_data = user_data.pop('user_profile', None)

        user_profile = cls._update_user_profile(user, user.user_profile, user_profile_data)

        for key, value in user_data.items():
            setattr(user, key, value)

        user.save()

        logger.info(f"Updated user: {user}")

        if user.role == UserRole.CUSTOMER:
            publisher.publish(CustomerUpdatedEvent(data={
                'id': user.id,
                'full_name': user_profile.full_name,
                'image_url': user_profile.image_url
            }))
        return user

    @classmethod
    def upload_user_avatar(cls, user: User, image):
        image_url = upload_to_firebase(user=user, image=image)
        user.user_profile.image_url = image_url
        user.user_profile.save()

        return user

    @classmethod
    def create_customer(cls, user_data: dict, user_profile_data: dict) -> User:
        user = cls.create_user(role=UserRole.CUSTOMER, user_data=user_data, user_profile_data=user_profile_data)

        send_customer_verification_email(user)

        publisher.publish(CustomerCreatedEvent(data={
            'id': user.id,
            'full_name': user.user_profile.full_name,
            'image_url': user.user_profile.image_url
        }))

        return user

    @classmethod
    def create_courier(cls, user_data: dict, user_profile_data: dict) -> User:
        user = cls.create_user(role=UserRole.COURIER, user_data=user_data, user_profile_data=user_profile_data)

        send_courier_verification_email(user)

        publisher.publish(CourierCreatedEvent(data={
            'id': user.id
        }))

        return user

    @classmethod
    def create_restaurant_manager(cls, user_data: dict, user_profile_data: dict) -> User:
        user = cls.create_user(role=UserRole.RESTAURANT_MANAGER, user_data=user_data, user_profile_data=user_profile_data)

        send_restaurant_manager_verification_email(user)

        publisher.publish(RestaurantManagerCreatedEvent(data={
            'id': user.id
        }))

        return user

    @classmethod
    def create_moderator(cls, user_data: dict, user_profile_data: dict) -> User:
        user = cls.create_user(role=UserRole.MODERATOR, user_data=user_data,
                               user_profile_data=user_profile_data)

        publisher.publish(ModeratorCreatedEvent(data={
            'id': user.id
        }))

        return user
