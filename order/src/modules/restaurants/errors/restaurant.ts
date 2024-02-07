import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class RestaurantNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(restaurantId: bigint) {
        super("id", restaurantId.toString(), "Restaurant")
    }

}

export class RestaurantAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(restaurantId: bigint) {
        super("id", restaurantId.toString(), "Restaurant")
    }

}