import AppError from "@src/base/errors/AppError";
import DatabaseInstanceAlreadyExistsError from "@src/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/base/errors/DatabaseInstanceNotFoundError";

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


export class PromocodeNotActiveError extends AppError {

    constructor(id: number) {
        super(`Promocode with id=${id} is not active`)
    }

    public get statusCode(): number {
        return 400
    }
}