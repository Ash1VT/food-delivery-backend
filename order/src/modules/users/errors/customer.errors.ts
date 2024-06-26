import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class CustomerNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(customerId: bigint) {
        super("id", customerId.toString(), "Customer")
    }

}

export class CustomerAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(customerId: bigint) {
        super("id", customerId.toString(), "Customer")
    }

}

export class CustomerOrderOwnershipError extends AppError {
    
    constructor(customerId: bigint, orderId: bigint) {
        super(`Customer with id=${customerId} is not a creator of an 
               Order with id=${orderId} to perform this action`)
    }

    public get statusCode(): number {
        return 403
    }

}


export class CustomerAddressOwnershipError extends AppError {
    
    constructor(customerId: bigint, addressId: bigint) {
        super(`Customer with id=${customerId} hasn't got an
               Address with id=${addressId} to perform this action`)
    }

    public get statusCode(): number {
        return 403
    }

}