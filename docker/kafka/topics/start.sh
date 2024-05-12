#!/usr/bin/env sh

while ! nc -z "$KAFKA_BROKER_HOST" "$KAFKA_BROKER_PORT";
  do sleep 1;
  echo "Waiting for $KAFKA_BROKER_HOST:$KAFKA_BROKER_PORT...";
done;

sleep 5

python create_topics.py