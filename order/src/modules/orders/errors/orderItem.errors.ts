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