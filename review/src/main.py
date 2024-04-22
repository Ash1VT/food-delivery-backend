from setup import app, start_app
from config import get_settings
from setup.logger import logger


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    settings = get_settings()
    start_app(settings)
