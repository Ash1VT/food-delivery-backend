from config import get_settings
from .permissions_client import *

settings = get_settings()

grpc_permissions_client = PermissionsClient(host=settings.permissions_grpc_server_host,
                                            port=settings.permissions_grpc_server_port)
