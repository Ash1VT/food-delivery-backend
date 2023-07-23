from .models import User, UserRole, UserProfile, CustomerProfile, CourierProfile


class UserService:

    @classmethod
    def _create_user_profile(cls, user: User, user_profile_data: dict) -> UserProfile:
        return UserProfile.objects.create(user=user, **user_profile_data)

    @classmethod
    def _create_customer_profile(cls, user: User) -> CustomerProfile:
        return CustomerProfile.objects.create(user=user)

    @classmethod
    def _create_courier_profile(cls, user: User) -> CourierProfile:
        return CourierProfile.objects.create(user=user)

    @classmethod
    def _update_user_profile(cls, user_profile: UserProfile, user_profile_data: dict) -> UserProfile:
        if user_profile_data:
            for key, value in user_profile_data.items():
                setattr(user_profile, key, value)
            user_profile.save()
        return user_profile

    @classmethod
    def update_user(cls, user: User, user_data: dict) -> User:
        user_profile_data = user_data.pop('user_profile', None)

        cls._update_user_profile(user.user_profile, user_profile_data)

        for key, value in user_data.items():
            setattr(user, key, value)

        user.save()
        return user

    @classmethod
    def create_customer(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.CUSTOMER)
        cls._create_user_profile(user=user, user_profile_data=user_profile_data)
        cls._create_customer_profile(user=user)
        return user

    @classmethod
    def create_courier(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.COURIER)
        cls._create_user_profile(user=user, user_profile_data=user_profile_data)
        cls._create_courier_profile(user=user)
        return user

    @classmethod
    def create_restaurant_manager(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.RESTAURANT_MANAGER)
        cls._create_user_profile(user=user, user_profile_data=user_profile_data)
        return user

    @classmethod
    def create_moderator(cls, user_data: dict, user_profile_data: dict) -> User:
        user = User.objects.create_user(**user_data, role=UserRole.MODERATOR)
        cls._create_user_profile(user=user, user_profile_data=user_profile_data)
        return user
