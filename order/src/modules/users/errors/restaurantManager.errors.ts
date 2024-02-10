import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class RestaurantManagerNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(restaurantManagerId: bigint) {
        super("id", restaurantManagerId.toString(), "RestaurantManager")
    }

}

export class RestaurantManagerAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(restaurantManagerId: bigint) {
        super("id", restaurantManagerId.toString(), "RestaurantManager")
    }

}

export class RestaurantManagerOwnershipError extends AppError {
    
    constructor(restaurantManagerId: bigint, restaurantId: bigint) {
        super(`Restaurant Manager with id=${restaurantManagerId} doesn't own
               Restaurant with id=${restaurantId} to perform this action`)
    }

    public get statusCode(): number {
        return 403
    }

}

export class RestaurantManagerMissingRestaurantError extends AppError {
    
    constructor() {
        super(`Restaurant Manager doesn't have a restaurant`)
    }

    public get statusCode(): number {
        return 403
    }
}