import AppError from "@src/base/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/base/errors/DatabaseInstanceNotFoundError";

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

export class RestaurantManagerOwnershipError extends AppError {
    
    constructor(restaurantManagerId: number, restaurantId: number) {
        super(`Restaurant Manager with id=${restaurantManagerId} doesn't own
               Restaurant with id=${restaurantId} to perform this action`)
    }

    public get statusCode(): number {
        return 403
    }

}