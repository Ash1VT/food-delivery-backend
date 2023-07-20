from rest_framework import serializers
from .models import User, UserProfile
from .services import create_customer, create_courier


class UserProfileSerializer(serializers.ModelSerializer):
    """"Serializer for user's profile"""

    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'age', 'phone', 'birth_date')


class UserSerializer(serializers.ModelSerializer):
    """Base serializer for common user data"""

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'password', 'user_profile')
        extra_kwargs = {
            'password': {'write_only': True}
        }


class CustomerSerializer(UserSerializer):
    """Serializer for customer"""

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        return create_customer(user_data=validated_data, user_profile_data=user_profile_data)


class CourierSerializer(UserSerializer):
    """Serializer for courier"""

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        return create_courier(user_data=validated_data, user_profile_data=user_profile_data)
