from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware

from api import api_router
from setup.kafka.consumer.receiver import init_kafka_receivers
from setup.kafka.consumer.creator import consumer_creator
from setup.kafka.producer.events import init_producer_events

# App initialization #

app = FastAPI(
    title="Review Microservice"
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include main api router #

app.include_router(api_router)


# Start kafka receivers #
@app.on_event("startup")
def startup_event():
    try:
        kafka_receivers = init_kafka_receivers(consumer_creator)
        logger.info("Started kafka receivers.")

        for kafka_receiver in kafka_receivers:
            kafka_receiver.start_receiving()
    except Exception as e:
        logger.error(f"Failed to start kafka receivers. Error: {str(e)}")

    try:
        init_producer_events()
        logger.info("Kafka producer events initialized")
    except Exception as e:
        logger.error(f"Error initializing kafka producer events: {e}")
