import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class CourierNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(courierId: bigint) {
        super("id", courierId.toString(), "Courier")
    }   

}

export class CourierAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(courierId: bigint) {
        super("id", courierId.toString(), "Courier")
    }

}

export class CourierOwnershipError extends AppError {
    
    constructor(courierId: bigint, orderId: bigint) {
        super(`Courier with id=${courierId} is not delivering Order with id=${orderId}`)
    }

    public get statusCode(): number {
        return 403
    }

}

export class CourierDeliveryLimitError extends AppError {
    
    constructor(courierId: bigint, orderLimit: bigint) {
        super(`Courier with id=${courierId} reached limit of simultaneously delivering orders: ${orderLimit}`)
    }

    public get statusCode(): number {
        return 403
    }
    
}