from config import get_settings
from .roles_client import *

settings = get_settings()

grpc_roles_client = RolesClient(host=settings.roles_grpc_server_host,
                                port=settings.roles_grpc_server_port)
