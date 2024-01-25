import AppError from "@src/base/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/base/errors/DatabaseInstanceNotFoundError";

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

export class OrderNotReadyError extends AppError {

    constructor(id: number) {
        super(`Order with id=${id} is not in 'Ready' status`)        
    }

    public get statusCode(): number {
        return 403
    }

}