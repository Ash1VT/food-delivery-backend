from rest_framework import serializers
from .models import User, UserProfile
from .services import UserService


# User profile serializers #

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user's profile."""

    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'phone', 'birth_date')


# User serializers #

class UserPostSerializer(serializers.ModelSerializer):
    """
    Base serializer for common user data for post requests.

    Includes the user profile serializer as a nested field for user profile data.

    to_representation() method is overridden to use UserOutSerializer for representation.
    """

    user_profile = UserProfileSerializer()
    expires_session = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ('email', 'password', 'expires_session', 'user_profile')

    def to_representation(self, instance):
        """
        Serialize user data using UserOutSerializer for representation.

        Args:
            instance (User): The user instance to be serialized.

        Returns:
            dict: The serialized user data.
        """

        serializer = UserOutSerializer(instance)
        return serializer.data


class CustomerPostSerializer(UserPostSerializer):
    """Customer serializer for post requests."""

    def create(self, validated_data):
        """
        Create a new customer user with the provided data.

        Args:
            validated_data (dict): The validated data for creating the customer.

        Returns:
            User: The created customer user instance.
        """

        user_profile_data = validated_data.pop('user_profile')
        return UserService.create_customer(user_data=validated_data, user_profile_data=user_profile_data)


class CourierPostSerializer(UserPostSerializer):
    """Courier serializer for post requests."""

    def create(self, validated_data):
        """
        Create a new courier user with the provided data.

        Args:
            validated_data (dict): The validated data for creating the courier.

        Returns:
            User: The created courier user instance.
        """

        user_profile_data = validated_data.pop('user_profile')
        return UserService.create_courier(user_data=validated_data, user_profile_data=user_profile_data)


class RestaurantManagerPostSerializer(UserPostSerializer):
    """Restaurant manager serializer for post requests."""

    def create(self, validated_data):
        """
        Create a new restaurant manager user with the provided data.

        Args:
            validated_data (dict): The validated data for creating the restaurant manager.

        Returns:
            User: The created restaurant manager user instance.
        """

        user_profile_data = validated_data.pop('user_profile')
        return UserService.create_restaurant_manager(user_data=validated_data, user_profile_data=user_profile_data)


class ModeratorPostSerializer(UserPostSerializer):
    """Moderator serializer for post requests."""

    expires_session = None

    class Meta:
        model = User
        fields = ('email', 'password', 'user_profile')

    def create(self, validated_data):
        """
        Create a new Moderator user with the provided data.

        Args:
            validated_data (dict): The validated data for creating the moderator.

        Returns:
            User: The created moderator user instance.
        """

        user_profile_data = validated_data.pop('user_profile')
        return UserService.create_moderator(user_data=validated_data, user_profile_data=user_profile_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    User serializer for put and patch requests.

    Includes the user profile serializer as a nested field for user profile data.

    to_representation() method is overridden to use UserOutSerializer for representation.
    """

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'user_profile')

    def update(self, instance: User, validated_data):
        """
        Update the user with the provided validated data.

        Args:
            instance (User): The user instance to be updated.
            validated_data (dict): The validated data for updating the user.

        Returns:
            User: The updated user instance.
        """

        print(validated_data)
        return UserService.update_user(instance, validated_data)

    def to_representation(self, instance):
        """
        Serialize user data using UserOutSerializer for representation.

        Args:
            instance (User): The user instance to be serialized.

        Returns:
            dict: The serialized user data.
        """

        serializer = UserOutSerializer(instance)
        return serializer.data


class UserUploadImageSerializer(serializers.Serializer):
    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('image',)

    def update(self, instance: User, validated_data):
        """
        Update the user with the provided validated data.

        Args:
            instance (User): The user instance to be updated.
            validated_data (dict): The validated data for updating the user.

        Returns:
            User: The updated user instance.
        """

        return UserService.upload_user_avatar(instance, validated_data.pop('image'))

    def to_representation(self, instance):
        """
        Serialize user data using UserOutSerializer for representation.

        Args:
            instance (User): The user instance to be serialized.

        Returns:
            dict: The serialized user data.
        """

        serializer = UserOutSerializer(instance)
        return serializer.data


class UserProfileOutSerializer(serializers.ModelSerializer):
    """
    User profile serializer for responses.
    """

    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'full_name', 'phone', 'image_url', 'birth_date')


class UserOutSerializer(serializers.ModelSerializer):
    """
    User serializer for responses.

    Includes the user profile serializer as a nested field for user profile data.
    """

    user_profile = UserProfileOutSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'role', 'last_login', 'is_active', 'is_email_verified', 'user_profile')


class UserUpdateModeratorSerializer(serializers.ModelSerializer):
    """
    Special user serializer for put and patch requests for moderators.

    Includes the user profile serializer as a nested field for user profile data.

    to_representation() method is overridden to use UserOutModeratorSerializer for representation.
    """

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'role', 'is_active', 'is_email_verified', 'user_profile')

    def update(self, instance: User, validated_data):
        """
        Update the user with the provided validated data.

        Args:
            instance (User): The user instance to be updated.
            validated_data (dict): The validated data for updating the user.

        Returns:
            User: The updated user instance.
        """

        return UserService.update_user(instance, validated_data)

    def to_representation(self, instance):
        """
        Serialize user data using UserOutModeratorSerializer for representation.

        Args:
            instance (User): The user instance to be serialized.

        Returns:
            dict: The serialized user data for moderators.
        """

        serializer = UserOutSerializer(instance)
        return serializer.data

# class UserOutModeratorSerializer(serializers.ModelSerializer):
#     """
#     Special user serializer for responses for moderators.
#
#     Includes the user profile serializer as a nested field for user profile data.
#     """
#
#     user_profile = UserProfileOutSerializer()
#
#     class Meta:
#         model = User
#         fields = ('id', 'email', 'role', 'last_login', 'is_active', 'is_email_verified', 'user_profile')
