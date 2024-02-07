import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class RestaurantNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Restaurant")
    }

}

export class RestaurantAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Restaurant")
    }

}