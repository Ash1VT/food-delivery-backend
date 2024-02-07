import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class CustomerNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Customer")
    }

}

export class CustomerAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Customer")
    }

}

export class CustomerOwnershipError extends AppError {
    
    constructor(customerId: number | bigint, orderId: number | bigint) {
        super(`Customer with id=${customerId} is not a creator of an 
               Order with id=${orderId} to perform this action`)
    }

    public get statusCode(): number {
        return 403
    }

}