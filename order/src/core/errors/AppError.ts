export default abstract class AppError extends Error {

    constructor(message: string) {
        super(message)
    }

    public abstract get statusCode(): number
    
}