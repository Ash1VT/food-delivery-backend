import sys

import graypy
from loguru import logger
from config.directories import BASE_DIRECTORY
from setup.settings.server import get_server_settings

simple_fmt = (
    "<level>{level}</level> "
    "<cyan>{name}</cyan> "
    "<level>{message}</level>"
)
comprehensive_fmt = (
    "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
    "<level>{level: <8}</level> | "
    "REVIEW | "
    "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
    " - <level>{message}</level>"
)

logger.remove()

logger.add(
    sink=sys.stderr,
    level="DEBUG",
    format=simple_fmt,
    colorize=True,
    backtrace=True,
    diagnose=True,
)


logger.add(
    sink=BASE_DIRECTORY / "logs.log",
    level="DEBUG",
    format=comprehensive_fmt,
    backtrace=True,
    diagnose=True
)

settings = get_server_settings()

handler = graypy.GELFUDPHandler(settings.graylog_host, settings.graylog_udp_port)

logger.add(
    sink=handler,
    level="DEBUG",
    format=comprehensive_fmt,
    backtrace=True,
    diagnose=True
)
