import AppError from "@src/core/errors/AppError"
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError"


export class CustomerAddressNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(orderId: bigint) {
        super("id", orderId.toString(), "CustomerAddress")
    }

}

    
export class CustomerAddressNotApprovedError extends AppError {

    constructor(customerAddressId: bigint) {
        super(`Customer address with id=${customerAddressId} is not in 'Approved' status`)        
    }

    public get statusCode(): number {
        return 400
    }

}