import DatabaseInstanceAlreadyExistsError from "@src/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/base/errors/DatabaseInstanceNotFoundError";

export class OrderItemNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "OrderItem")
    }

}

export class OrderItemAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "OrderItem")
    }

}