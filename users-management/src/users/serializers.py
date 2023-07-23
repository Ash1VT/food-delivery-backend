from rest_framework import serializers
from .models import User, UserProfile
from .services import UserService


# User profile serializers #

class UserProfileSerializer(serializers.ModelSerializer):
    """"Serializer for user's profile"""

    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'age', 'phone', 'birth_date')


# User serializers #

class UserPostSerializer(serializers.ModelSerializer):
    """Base serializer for common user data for post requests"""

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'password', 'user_profile')

    def to_representation(self, instance):
        serializer = UserOutSerializer(instance)
        return serializer.data


class CustomerPostSerializer(UserPostSerializer):
    """Customer serializer for post requests"""

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        return UserService.create_customer(user_data=validated_data, user_profile_data=user_profile_data)


class CourierPostSerializer(UserPostSerializer):
    """Courier serializer for post requests"""

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        return UserService.create_courier(user_data=validated_data, user_profile_data=user_profile_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """User serializer for put and patch requests"""

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'user_profile')

    def update(self, instance: User, validated_data):
        return UserService.update_user(instance, validated_data)

    def to_representation(self, instance):
        serializer = UserOutSerializer(instance)
        return serializer.data


class UserOutSerializer(serializers.ModelSerializer):
    """User serializer for responses"""

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'user_profile')


class UserUpdateModeratorSerializer(serializers.ModelSerializer):
    """Special user serializer for put and patch requests for moderators"""

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'role', 'is_active', 'user_profile')

    def update(self, instance: User, validated_data):
        return UserService.update_user(instance, validated_data)

    def to_representation(self, instance):
        serializer = UserOutModeratorSerializer(instance)
        return serializer.data


class UserOutModeratorSerializer(serializers.ModelSerializer):
    """Special user serializer for responses for moderators"""

    user_profile = UserProfileSerializer()
    # role = serializers.CharField(source='get_role_display')

    class Meta:
        model = User
        fields = ('id', 'email', 'role', 'last_login', 'is_active', 'user_profile')
