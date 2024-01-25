import AppError from "@src/base/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/base/errors/DatabaseInstanceNotFoundError";

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
    
    constructor(customerId: number, orderId: number) {
        super(`Customer with id=${customerId} is not a creator of an 
               Order with id=${orderId} to perform this action`)
    }

    public get statusCode(): number {
        return 403
    }

}