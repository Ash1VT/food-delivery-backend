import AppError from "./AppError";

export default abstract class DatabaseInstanceAlreadyExistsError extends AppError {

    constructor(fieldName: string, fieldValue: string, modelName: string) {
        super(`${modelName} with ${fieldName}=${fieldValue} already exists`)
    }

    get statusCode(): number {
        return 400
    }

}