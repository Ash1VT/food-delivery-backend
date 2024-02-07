import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class PromocodeNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(promocodeId: bigint) {
        super("id", promocodeId.toString(), "Promocode")
    }

}

export class PromocodeNotFoundWithNameError extends DatabaseInstanceNotFoundError {

    constructor(name: string) {
        super("name", name, "Promocode")
    }

}

export class PromocodeAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(promocodeId: bigint) {
        super("id", promocodeId.toString(), "Promocode")
    }

}

export class PromocodeAlreadyExistsWithNameError extends DatabaseInstanceAlreadyExistsError {

    constructor(name: string) {
        super("name", name, "Promocode")
    }

}

export class PromocodeAmountUsageError extends AppError {

    constructor(promocodeId: bigint) {
        super(`Promocode with id=${promocodeId} has maximum amount of usages`)
    }

    public get statusCode(): number {
        return 400
    }
}

export class PromocodeMaximumUsageError extends AppError {

    constructor(promocodeId: bigint) {
        super(`Cannot set maximum usage smaller than current usage count for Promocode with id=${promocodeId}`)
    }

    public get statusCode(): number {
        return 400
    }
}

export class PromocodeExpiredUsageError extends AppError {

    constructor(promocodeId: bigint) {
        super(`Promocode with id=${promocodeId} is expired`)
    }

    public get statusCode(): number {
        return 400
    }
}

export class PromocodeNotActiveError extends AppError {

    constructor(promocodeId: bigint) {
        super(`Promocode with id=${promocodeId} is not active`)
    }

    public get statusCode(): number {
        return 400
    }
}

export class PromocodeNotBelongsToRestaurantError extends AppError {

    constructor(promocodeId: bigint, restaurantId: bigint) {
        super(`Promocode with id=${promocodeId} is not belongs to restaurant with id=${restaurantId}`)
    }

    public get statusCode(): number {
        return 400
    }
}