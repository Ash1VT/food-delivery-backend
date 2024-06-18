import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class OrderItemNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(orderId: bigint) {
        super("id", orderId.toString(), "OrderItem")
    }

}

export class OrderItemAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(orderId: bigint) {
        super("id", orderId.toString(), "OrderItem")
    }

}

export class OrderItemNotInOrderError extends AppError {
    constructor(orderId: bigint, orderItemId: bigint) {
        super(`OrderItem with id=${orderItemId} is not in an Order with id=${orderId}`)
    }

    public get statusCode(): number {
        return 400
    }
}