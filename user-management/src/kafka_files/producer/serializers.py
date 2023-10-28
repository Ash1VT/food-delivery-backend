from rest_framework.serializers import ModelSerializer

from users.models import User


class RestaurantManagerCreatedSerializer(ModelSerializer):
    """
    Serializes RestaurantManager to data that will be published to Kafka.
    """

    class Meta:
        model = User
        fields = ['id']


class ModeratorCreatedSerializer(ModelSerializer):
    """
    Serializes Moderator to data that will be published to Kafka.
    """

    class Meta:
        model = User
        fields = ['id']
