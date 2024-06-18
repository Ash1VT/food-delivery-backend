from setup.settings.server import get_server_settings
from setup.sqlalchemy.admin import admin


def start_app():
    import uvicorn
    settings = get_server_settings()
    uvicorn.run("setup.app:app", host=settings.web_app_host, port=settings.web_app_port, reload=settings.reload)
