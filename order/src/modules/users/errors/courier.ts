import DatabaseInstanceAlreadyExistsError from "@/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@/base/errors/DatabaseInstanceNotFoundError";

export class CourierNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Courier")
    }

}

export class CourierAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Courier")
    }

}