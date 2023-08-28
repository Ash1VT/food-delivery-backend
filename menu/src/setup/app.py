from fastapi import FastAPI
from api import api_router

# App initialization #

app = FastAPI(
    title="Menu Microservice"
)

# Include main api router #

app.include_router(api_router)
