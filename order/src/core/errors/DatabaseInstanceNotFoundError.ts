import AppError from "./AppError";

export default abstract class DatabaseInstanceNotFoundError extends AppError {

    constructor(fieldName: string, fieldValue: string, modelName: string) {
        super(`${modelName} with ${fieldName}=${fieldValue} not found`)
    }

    get statusCode(): number {
        return 404
    }

}