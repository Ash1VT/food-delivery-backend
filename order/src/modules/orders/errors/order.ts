import DatabaseInstanceAlreadyExistsError from "@/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@/base/errors/DatabaseInstanceNotFoundError";

export class OrderNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Order")
    }

}

export class OrderAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Order")
    }

}