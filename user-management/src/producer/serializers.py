from rest_framework import serializers


class CustomerCreatedSerializer(serializers.Serializer):
    """
    Serializes Customer to data that will be published to Kafka.
    """

    id = serializers.IntegerField(min_value=0)


class CustomerCreatedToReviewSerializer(serializers.Serializer):
    """
    Serializes Customer to data that will be published to Kafka to review microservice.
    """

    id = serializers.IntegerField(min_value=0)
    full_name = serializers.CharField(max_length=254)
    image_url = serializers.CharField()


class CustomerUpdatedSerializer(serializers.Serializer):
    """
    Serializes Customer to data that will be published to Kafka.
    """

    id = serializers.IntegerField(min_value=0)
    full_name = serializers.CharField(max_length=254, allow_null=True)
    image_url = serializers.CharField(allow_null=True)


class CourierCreatedSerializer(serializers.Serializer):
    """
    Serializes Courier to data that will be published to Kafka.
    """

    id = serializers.IntegerField(min_value=0)


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
