from rest_framework import serializers
from .models import User, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """"Serializer for user's profile"""

    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'age', 'phone', 'birth_date')


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user"""

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'password', 'user_profile')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, **user_profile_data)
        return user
