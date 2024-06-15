from typing import Union, Optional, Dict

from fastapi import HTTPException
from grpc import RpcError
from loguru import logger

from grpc_files import grpc_roles_client
from models import RestaurantManager, Moderator
from user_roles import RestaurantManagerRole, ModeratorRole, UserRole
from uow import SqlAlchemyUnitOfWork
from utils.grpc import grpc_status_to_http
from services.manager import RestaurantManagerService
from services.moderator import ModeratorService

__all__ = [
    "authenticate",
]

microservice_roles: Dict[UserRole, RestaurantManagerService | ModeratorService] = {
    RestaurantManagerRole(): RestaurantManagerService(),
    ModeratorRole(): ModeratorService(),
}


async def authenticate(access_token: Optional[str],
                       uow: SqlAlchemyUnitOfWork) -> Union[RestaurantManager, Moderator, None]:
    """
    Authenticates a user using an access token via grpc request to User microservice
    and returns the corresponding user object.

    Args:
        access_token (Optional[str]): The access token used for authentication.
        uow (SqlAlchemyUnitOfWork): The unit of work object for interacting with the database.

    Returns:
        Union[RestaurantManager, Moderator, None]: The user object if authentication is successful,
        None if the access token is missing or empty, or None if user's role is not supported in this microservice.

    Raises:
        HTTPException: Raised if there is an error communicating with the gRPC service.
    """

    try:
        if not access_token or len(access_token) == 0:
            logger.info("Authenticated as anonymous user")
            return

        grpc_response = grpc_roles_client.get_user_role(access_token)

        for role in microservice_roles:
            if role.grpc_role == grpc_response.role:
                user_id = int(grpc_response.user_id)
                user = await microservice_roles[role].retrieve_instance(user_id, uow)
                logger.info(f"Authenticated as user with id={user.id} and role={str(role)}")
                return user

        logger.warning(f"User role {str(grpc_response.role)} is not supported in this microservice")
        logger.info("Authenticated as anonymous user")
    except RpcError as e:
        logger.error(f"Error communicating with User microservice: {e.details()}")
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )
