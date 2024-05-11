import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class DeliveryInformationNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(orderId: bigint) {
        super("id", orderId.toString(), "DeliveryInformation")
    }

}