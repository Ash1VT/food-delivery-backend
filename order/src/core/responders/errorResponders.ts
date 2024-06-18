import { ServiceError } from "@grpc/grpc-js"
import { Request, Response, NextFunction } from "express"
import AppError from "../errors/AppError"
import { grpcStatusToHttp } from "../utils/grpc"
import { ZodError } from "zod"

export const validationErrorResponder = (error: ZodError, request: Request, response: Response, next: NextFunction) => {
    if (!(error instanceof ZodError)) {
        next(error)
        return
    }

    response.header("Content-Type", 'application/json')
    const status = 400
    response.status(status).json({
        message: {
            errors: error.errors
        }
    })
}

export const appErrorResponder = (error: AppError, request: Request, response: Response, next: NextFunction) => {
    if (!(error instanceof AppError)) {
        next(error)
        return
    }

    const status = error.statusCode
    response.status(status).json({
        message: error.message
    })
}

export const grpcErrorResponder = (error: ServiceError, request: Request, response: Response, next: NextFunction) => {
    if(!(error.code && error.details && error.message && error.metadata && error.name)) {
        next(error)
        return
    }

    const status = grpcStatusToHttp(error.code)
    response.status(status).json({
        message: error.details
    })
}

export const genericErrorResponder = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error)
    
    const status = 500
    response.status(status).json({message: "Critical. Unknown error."})
}