import { Status } from "@grpc/grpc-js/build/src/constants"

Status.DATA_LOSS


const grpcHttpStatusMapping: { [key in Status]: number } = {
    [Status.OK]: 200,
    [Status.CANCELLED]: 499,
    [Status.UNKNOWN]: 500,
    [Status.INVALID_ARGUMENT]: 400,
    [Status.DEADLINE_EXCEEDED]: 504,
    [Status.NOT_FOUND]: 404,
    [Status.ALREADY_EXISTS]: 409,
    [Status.PERMISSION_DENIED]: 403,
    [Status.UNAUTHENTICATED]: 401,
    [Status.RESOURCE_EXHAUSTED]: 429,
    [Status.FAILED_PRECONDITION]: 400,
    [Status.ABORTED]: 409,
    [Status.OUT_OF_RANGE]: 400,
    [Status.UNIMPLEMENTED]: 501,
    [Status.INTERNAL]: 500,
    [Status.UNAVAILABLE]: 503,
    [Status.DATA_LOSS]: 500,
}

export function grpcStatusToHttp(grpcStatusCode: Status): number {
    // Default to 500 if not found
    return grpcHttpStatusMapping[grpcStatusCode] || 500;
}