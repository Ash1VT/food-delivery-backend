from config.settings import Settings


def start_app(settings: Settings):
    import uvicorn
    uvicorn.run("setup.app:app", host=settings.web_app_host, port=settings.web_app_port, reload=settings.reload)
