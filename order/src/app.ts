import getSettings from "./core/utils/getSettings";
import { getExpressApp, startExpressApp } from "./core/setup/express";
import { getPrismaClient } from "./core/setup/prisma";
import { registerSwagger } from "./core/setup/swagger";
import cookieParser from "cookie-parser"
import { getUser } from "./grpc/getUser";
import AppError from "./core/errors/AppError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { MenuItemNotFoundWithIdError } from "./modules/menu/errors/menuItem.errors";
import { grpcStatusToHttp } from "./core/utils/grpc";
import PrismaUserServiceFactory from "./modules/users/services/factories/implementations/prisma/PrismaUserServiceFactory";
import PrismaUserRepositoryFactory from "./modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";
import { authenticate } from "./modules/authentication/utils/authenticate";
import { appErrorResponder, grpcErrorResponder, genericErrorResponder, validationErrorResponder } from "./core/responders/errorResponders";
import { makeOrder, getAvailableForDeliveryOrders } from "./modules/orders/controllers/order.controllers";
import bodyParser from "body-parser";

const app = getExpressApp()
const prismaClient = getPrismaClient()
const appSettings = getSettings()

registerSwagger(app)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

app.get('/', asyncHandler(async (req, res: Response, next) => {
    
    const accessToken = req.cookies['access_token']
    
    // const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
    const user = await authenticate(accessToken)
    
    res.json({'message': {
        'user': user
    }})
}))

app.get('/error', asyncHandler(async (req, res: Response, next) => {
    throw new Error("AAAAA")
}))

app.post('/test', asyncHandler(makeOrder))
app.post('/get_orders', asyncHandler(getAvailableForDeliveryOrders))
app.post('/test', asyncHandler(makeOrder))

app.use(validationErrorResponder)
app.use(appErrorResponder)
app.use(grpcErrorResponder)
app.use(genericErrorResponder)

startExpressApp(app, appSettings)