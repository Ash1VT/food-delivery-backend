from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware

from api import api_router
from config import get_settings
from consumer import consumer_creator
from setup.kafka.consumer import init_kafka_receivers
from setup.kafka.producer import init_producer_events

# App initialization #

app = FastAPI(
    title="Restaurant Microservice"
)

origins = [
    "https://ash1vt.github.io/food-delivery-frontend",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include main api router #

app.include_router(api_router)


# Startup

@app.on_event("startup")
def startup_event():
    settings = get_settings()

    try:
        kafka_receivers = init_kafka_receivers(consumer_creator, settings)
        for kafka_receiver in kafka_receivers:
            kafka_receiver.start_receiving()
        logger.info("Kafka receivers initialized")
    except Exception as e:
        logger.error(f"Error initializing kafka receivers: {e}")

    try:
        init_producer_events(settings)
        logger.info("Kafka producer events initialized")
    except Exception as e:
        logger.error(f"Error initializing kafka producer events: {e}")

    try:
        from setup.firebase import init_firebase
        init_firebase(settings)
        logger.info("Firebase initialized")
    except Exception as e:
        logger.error(f"Error initializing firebase: {e}")

