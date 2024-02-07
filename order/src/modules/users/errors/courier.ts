import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class CourierNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Courier")
    }   

}

export class CourierAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Courier")
    }

}

export class CourierOwnershipError extends AppError {
    
    constructor(courierId: number | bigint, orderId: number | bigint) {
        super(`Courier with id=${courierId} is not delivering Order with id=${orderId}`)
    }

    public get statusCode(): number {
        return 403
    }

}

export class CourierDeliveryLimitError extends AppError {
    
    constructor(courierId: number, orderLimit: number) {
        super(`Courier with id=${courierId} reached limit of simultaneously delivering orders: ${orderLimit}`)
    }

    public get statusCode(): number {
        return 403
    }
    
}