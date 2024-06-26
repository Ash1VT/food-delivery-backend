import AppError from "@src/core/errors/AppError";

export class PermissionDeniedError extends AppError {

    constructor() {
        super("User hasn't got enough permissions to perform this action")
    }

    public get statusCode(): number {
        return 403
    }

}