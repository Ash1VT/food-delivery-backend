from fastapi import FastAPI
from src.api import api_router

# App initialization #

app = FastAPI(
    title="Menu Microservice"
)

# Include main api router #

app.include_router(api_router)
