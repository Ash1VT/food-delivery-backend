import DatabaseInstanceAlreadyExistsError from "@src/base/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/base/errors/DatabaseInstanceNotFoundError";

export class ModeratorNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(id: number) {
        super("id", id.toString(), "Moderator")
    }

}

export class ModeratorAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(id: number) {
        super("id", id.toString(), "Moderator")
    }

}