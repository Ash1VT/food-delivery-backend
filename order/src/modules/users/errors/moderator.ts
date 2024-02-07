import DatabaseInstanceAlreadyExistsError from "@src/core/errors/DatabaseInstanceAlreadyExistsError";
import DatabaseInstanceNotFoundError from "@src/core/errors/DatabaseInstanceNotFoundError";

export class ModeratorNotFoundWithIdError extends DatabaseInstanceNotFoundError {

    constructor(moderatorId: bigint) {
        super("id", moderatorId.toString(), "Moderator")
    }

}

export class ModeratorAlreadyExistsWithIdError extends DatabaseInstanceAlreadyExistsError {

    constructor(moderatorId: bigint) {
        super("id", moderatorId.toString(), "Moderator")
    }

}