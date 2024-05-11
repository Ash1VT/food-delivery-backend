import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class OrderNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(orderId: bigint) {
        super("id", orderId.toString(), "Order")
    }

}

export class OrderAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(orderId: bigint) {
        super("id", orderId.toString(), "Order")
    }

}

export class OrderNotReadyError extends AppError {

    constructor(orderId: bigint) {
        super(`Order with id=${orderId} is not in 'Ready' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}


export class OrderNotPendingError extends AppError {

    constructor(orderId: bigint) {
        super(`Order with id=${orderId} is not in 'Pending' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}

export class OrderNotPreparingError extends AppError {

    constructor(orderId: bigint) {
        super(`Order with id=${orderId} is not in 'Preparing' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}

export class OrderNotDeliveringError extends AppError {

    constructor(orderId: bigint) {
        super(`Order with id=${orderId} is not in 'Delivering' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}