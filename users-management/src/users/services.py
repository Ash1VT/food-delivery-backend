from .models import User, UserRole, UserProfile, CustomerProfile, CourierProfile


def __create_user_profile(user: User, user_profile_data: dict) -> UserProfile:
    return UserProfile.objects.create(user=user, **user_profile_data)


def __create_customer_profile(user: User) -> CustomerProfile:
    return CustomerProfile.objects.create(user=user)


def __create_courier_profile(user: User) -> CourierProfile:
    return CourierProfile.objects.create(user=user)


def create_customer(user_data: dict, user_profile_data: dict) -> User:
    user = User.objects.create_user(**user_data, role=UserRole.CUSTOMER)
    __create_user_profile(user=user, user_profile_data=user_profile_data)
    __create_customer_profile(user=user)
    return user


def create_courier(user_data: dict, user_profile_data: dict):
    user = User.objects.create_user(**user_data, role=UserRole.COURIER)
    __create_user_profile(user=user, user_profile_data=user_profile_data)
    __create_courier_profile(user=user)
    return user


def create_restaurant_manager(user_data: dict, user_profile_data: dict):
    user = User.objects.create_user(**user_data, role=UserRole.RESTAURANT_MANAGER)
    __create_user_profile(user=user, user_profile_data=user_profile_data)
    return user


def create_moderator(user_data: dict, user_profile_data: dict):
    user = User.objects.create_user(**user_data, role=UserRole.MODERATOR)
    __create_user_profile(user=user, user_profile_data=user_profile_data)
    return user
