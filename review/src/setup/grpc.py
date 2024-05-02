from grpc_files.roles_client import RolesClient
from setup.settings.server import get_server_settings

settings = get_server_settings()

grpc_roles_client = RolesClient(host=settings.roles_grpc_server_host,
                                port=settings.roles_grpc_server_port)
