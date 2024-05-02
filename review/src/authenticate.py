from typing import Optional, Union, Dict

from fastapi import HTTPException
from grpc import RpcError
from loguru import logger

from grpc_files import grpc_roles_client
from grpc_files.repository import get_repository
from grpc_files.status import grpc_status_to_http
from models.courier import CourierModel
from models.customer import CustomerModel
from uow.generic import GenericUnitOfWork


async def authenticate(access_token: Optional[str],
                       uow: GenericUnitOfWork) -> Union[CustomerModel, CourierModel, None]:
    """
    Authenticates a user using an access token via grpc request to User microservice
    and returns the corresponding user object.

    Args:
        access_token (Optional[str]): The access token used for authentication.
        uow (GenericUnitOfWork): The unit of work object for interacting with the database.

    Returns:
        Union[CustomerModel, CourierModel, None]: The user object if authentication is successful,
        None if the access token is missing or empty, or None if user's role is not supported in this microservice.

    Raises:
        HTTPException: Raised if there is an error communicating with the gRPC service.
    """

    try:
        if not access_token or len(access_token) == 0:
            return

        grpc_response = grpc_roles_client.get_user_role(access_token)

        repository = get_repository(grpc_response.role, uow)

        if repository is None:
            return

        user_id = int(grpc_response.user_id)
        return await repository.retrieve(user_id)

    except RpcError as e:
        logger.error("Error communicating with User microservice: %s", e.details())
        raise HTTPException(
            status_code=grpc_status_to_http(e.code()),
            detail=e.details()
        )
