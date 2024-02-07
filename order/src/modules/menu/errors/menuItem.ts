import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class MenuItemNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "MenuItem")
    }
}

export class MenuItemAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "MenuItem")
    }
}


export class MenuItemAlreadyInOrderError extends AppError {

    constructor(menuItemName: string, orderId: number | bigint) {
        super(`Menu Item with name=${menuItemName} is already in Order with id=${orderId}`)
    }

    public get statusCode(): number {
        return 400
    }

}

export class MenuItemNotInSameOrderRestaurantError extends AppError {

    constructor(menuItemName: string, orderId: number | bigint) {
        super(`Menu Item with name=${menuItemName} have not the same restaurant as Order with id=${orderId}`)
    }

    public get statusCode(): number {
        return 400
    }

}

export class MenuItemAllNotInSameRestaurantError extends AppError {

    constructor() {
        super(`Menu Items are not all from one restaurant`)
    }

    public get statusCode(): number {
        return 400
    }

}