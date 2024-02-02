import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

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

    constructor(id: number | bigint) {
        super(`Order with id=${id} is not in 'Ready' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}

export class OrderNotDeliveringError extends AppError {

    constructor(id: number | bigint) {
        super(`Order with id=${id} is not in 'Delivering' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}

export class OrderCourierOwnershipError extends AppError {

    constructor(id: number | bigint) {
        super(`Courier cannot perform actions on order with id=${id}`)        
    }

    public get statusCode(): number {
        return 403
    }

}

export class OrderCustomerOwnershipError extends AppError {

    constructor(id: number | bigint) {
        super(`Customer cannot perform actions on order with id=${id}`)        
    }

    public get statusCode(): number {
        return 403
    }

}