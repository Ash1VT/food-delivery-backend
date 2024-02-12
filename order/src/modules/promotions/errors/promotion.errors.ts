import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class PromotionNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(promocodeId: bigint) {
        super("id", promocodeId.toString(), "Promotion")
    }

}

export class PromotionAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(promocodeId: bigint) {
        super("id", promocodeId.toString(), "Promotion")
    }

}