from fastapi import FastAPI
from api import api_router
from config import get_settings

from consumer import consumer_creator
from setup.kafka.consumer import init_kafka_receivers
from setup.kafka.producer import init_producer_events

# App initialization #

app = FastAPI(
    title="Menu Microservice"
)

# Include main api router #

app.include_router(api_router)


# Startup

@app.on_event("startup")
def start_kafka_receivers():
    try:
        settings = get_settings()
        kafka_receivers = init_kafka_receivers(consumer_creator, settings)
        for kafka_receiver in kafka_receivers:
            kafka_receiver.start_receiving()
    except Exception as e:
        print(e)


@app.on_event("startup")
def init_kafka_producer_events():
    try:
        settings = get_settings()
        init_producer_events(settings)
    except Exception as e:
        print(e)


@app.on_event("startup")
def authenticate_firebase():
    try:
        from setup.firebase import init_firebase
        settings = get_settings()
        init_firebase(settings)
    except Exception as e:
        print(e)
