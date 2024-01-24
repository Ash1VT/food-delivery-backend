import DatabaseInstanceAlreadyExistsError from "@/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@/base/errors/DatabaseInstanceNotFoundError";

export class CustomerNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Customer")
    }

}

export class CustomerAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Customer")
    }

}