from grpc import StatusCode

__all__ = ["grpc_status_to_http"]


grpc_http_status_mapping = {
    StatusCode.OK: 200,
    StatusCode.CANCELLED: 499,
    StatusCode.UNKNOWN: 500,
    StatusCode.INVALID_ARGUMENT: 400,
    StatusCode.DEADLINE_EXCEEDED: 504,
    StatusCode.NOT_FOUND: 404,
    StatusCode.ALREADY_EXISTS: 409,
    StatusCode.PERMISSION_DENIED: 403,
    StatusCode.UNAUTHENTICATED: 401,
    StatusCode.RESOURCE_EXHAUSTED: 429,
    StatusCode.FAILED_PRECONDITION: 400,
    StatusCode.ABORTED: 409,
    StatusCode.OUT_OF_RANGE: 400,
    StatusCode.UNIMPLEMENTED: 501,
    StatusCode.INTERNAL: 500,
    StatusCode.UNAVAILABLE: 503,
    StatusCode.DATA_LOSS: 500,
}


def grpc_status_to_http(grpc_status_code: StatusCode) -> int:
    """
    Returns the HTTP status code for a gRPC status code.

    Args:
        grpc_status_code (StatusCode): The gRPC status code.

    Returns:
        int: The HTTP status code.
    """

    # Default to 500 if not found
    return grpc_http_status_mapping.get(grpc_status_code, 500)
