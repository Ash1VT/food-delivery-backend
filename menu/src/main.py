import os

import uvicorn
from kafka import KafkaProducer

from setup.logger import logger
from config import get_settings, BASE_DIRECTORY

if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    settings = get_settings()
    uvicorn.run(app="setup.app:app", host=settings.web_app_host, port=settings.web_app_port, reload=settings.reload)
