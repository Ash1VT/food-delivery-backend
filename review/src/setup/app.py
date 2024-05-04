from fastapi import FastAPI
from loguru import logger

from api import api_router
from setup.kafka.consumer.receiver import init_kafka_receivers
from setup.kafka.consumer.sasl_creator import consumer_sasl_creator

# App initialization #

app = FastAPI(
    title="Review Microservice"
)

# Include main api router #

app.include_router(api_router)


# Start kafka receivers #
@app.on_event("startup")
def start_kafka_receivers():
    try:
        kafka_receivers = init_kafka_receivers(consumer_sasl_creator)
        logger.info("Started kafka receivers.")

        for kafka_receiver in kafka_receivers:
            kafka_receiver.start_receiving()
    except Exception as e:
        logger.error(f"Failed to start kafka receivers. Error: {str(e)}")
