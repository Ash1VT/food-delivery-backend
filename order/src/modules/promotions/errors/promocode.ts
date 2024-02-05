import AppError from "@src/core/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class PromocodeNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Promocode")
    }

}

export class PromocodeNotFoundWithNameError extends DatabaseInstanceNotFoundError {

    constructor(name: string) {
        super("name", name, "Promocode")
    }

}

export class PromocodeAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Promocode")
    }

}

export class PromocodeUsageError extends AppError {

    constructor(id: number) {
        super(`Promocode with id=${id} has maximum amount of usages`)
    }

    public get statusCode(): number {
        return 400
    }
}

export class PromocodeMaximumUsageError extends AppError {

    constructor(id: number) {
        super(`Cannot set maximum usage smaller than current usage count for Promocode with id=${id}`)
    }

    public get statusCode(): number {
        return 400
    }
}

export class PromocodeNotActiveError extends AppError {

    constructor(id: number) {
        super(`Promocode with id=${id} is not active`)
    }

    public get statusCode(): number {
        return 400
    }
}