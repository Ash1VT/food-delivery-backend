from typing import Union, Optional, Dict

from fastapi import HTTPException
from grpc import RpcError

from grpc_files import grpc_roles_client
from models import RestaurantManager
from roles import RestaurantManagerRole, UserRole
from uow import SqlAlchemyUnitOfWork
from utils import grpc_status_to_http
from services.manager import RestaurantManagerService

__all__ = [
    "authenticate",
]

microservice_roles: Dict[UserRole, RestaurantManagerService] = {
    RestaurantManagerRole(): RestaurantManagerService(),
}


async def authenticate(access_token: Optional[str],
                       uow: SqlAlchemyUnitOfWork) -> Union[RestaurantManager, None]:
    """
    Authenticates a user using an access token via grpc request to User microservice
    and returns the corresponding user object.

    Args:
        access_token (Optional[str]): The access token used for authentication.
        uow (SqlAlchemyUnitOfWork): The unit of work object for interacting with the database.

    Returns:
        Union[RestaurantManager, None]: The user object if authentication is successful,
        None if the access token is missing or empty, or None if user's role is not supported in this microservice.

    Raises:
        HTTPException: Raised if there is an error communicating with the gRPC service.
    """

    try:
        if not access_token or len(access_token) == 0:
            return

        grpc_response = grpc_roles_client.get_user_role(access_token)

        for role in microservice_roles:
            if role.grpc_role == grpc_response.role:
                return await microservice_roles[role].retrieve_instance(grpc_response.user_id, uow)

    except RpcError as e:
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )