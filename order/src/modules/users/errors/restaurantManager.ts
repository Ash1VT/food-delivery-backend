import DatabaseInstanceAlreadyExistsError from "@/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@/base/errors/DatabaseInstanceNotFoundError";

export class RestaurantManagerNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "RestaurantManager")
    }

}

export class RestaurantManagerAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "RestaurantManager")
    }

}