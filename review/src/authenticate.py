from typing import Optional, Union, Dict, Any, List, Type

from fastapi import HTTPException
from grpc import RpcError, StatusCode
from loguru import logger

from grpc_files.repository import get_repository
from grpc_files.roles_client import RolesClient
from grpc_files.status import grpc_status_to_http
from roles import UserRole
from uow.generic import GenericUnitOfWork


async def authenticate(access_token: Optional[str],
                       uow: GenericUnitOfWork,
                       grpc_roles_client: RolesClient,
                       app_roles: List[Type[UserRole]]) -> Any:
    """
    Authenticates a user using an access token via grpc request to User microservice
    and returns the corresponding user object.

    Args:
        access_token (Optional[str]): The access token used for authentication.
        uow (GenericUnitOfWork): The unit of work object for interacting with the database.
        grpc_roles_client (RolesClient): The gRPC client for interacting with the User microservice.
        app_roles (List[Type[UserRole]]): The list of supported roles in the application.

    Returns:
        Any: The user object if authentication is successful,
        None if the access token is missing or empty, or if user's role is not supported in this microservice.

    Raises:
        HTTPException: Raised if there is an error communicating with the gRPC service.
    """

    try:
        if not access_token or len(access_token) == 0:
            logger.info("Authenticated as anonymous user")
            return

        grpc_response = grpc_roles_client.get_user_role(access_token)

        repository = get_repository(grpc_response.role, uow, app_roles)

        if repository is None:
            logger.info("Authenticated as anonymous user")
            return

        user_id = int(grpc_response.user_id)
        user = await repository.retrieve(user_id)

        logger.info(f"Authenticated user with id={user_id} and role={grpc_response.role}")

        return user

    except RpcError as e:
        if e.code() == StatusCode.UNAUTHENTICATED:
            return

        logger.error(f"Error communicating with User microservice: {e.details()}")
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )
