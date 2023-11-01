from rest_framework import serializers


class RestaurantManagerCreatedSerializer(serializers.Serializer):
    """
    Serializes RestaurantManager to data that will be published to Kafka.
    """

    id = serializers.IntegerField(min_value=0)


class ModeratorCreatedSerializer(serializers.Serializer):
    """
    Serializes Moderator to data that will be published to Kafka.
    """

    id = serializers.IntegerField(min_value=0)
