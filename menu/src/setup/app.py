from fastapi import FastAPI
from api import api_router

from consumer import init_kafka_receivers

# App initialization #

app = FastAPI(
    title="Menu Microservice"
)

# Include main api router #

app.include_router(api_router)


# Startup

@app.on_event("startup")
def start_kafka_receivers():
    kafka_receivers = init_kafka_receivers()
    for kafka_receiver in kafka_receivers:
        kafka_receiver.start_receiving()
