import { orderCreateValidator } from '@src/modules/orders/validators/order.validators';
import { getPrismaClient } from "./../../../core/setup/prisma";
import { Request, Response } from "express"
import PrismaOrderServiceFactory from '../services/factories/implementations/prisma/PrismaOrderServiceFactory';
import { authenticate } from '@src/modules/authentication/utils/authenticate';
import { authenticateService } from '@src/modules/authentication/utils/authenticateService';
import PrismaUserRepositoryFactory from '@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory';
import { idValidator } from '@src/core/validators/idValidator';

export const createOrder = async (req: Request, res: Response) => {
    const orderCreateInputDto = orderCreateValidator.parse(req.body)
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDto = await orderService.makeOrder(orderCreateInputDto)
    
    res.json(orderCreateOutputDto)
}

export const getCurrentCustomerOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDtos = await orderService.getCurrentCustomerOrders()
    
    res.json(orderCreateOutputDtos)
}

export const getCurrentCourierOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDtos = await orderService.getCurrentCourierOrders()
    
    res.json(orderCreateOutputDtos)
}

export const getAvailableForDeliveryOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDtos = await orderService.getReadyOrders()
    
    res.json(orderCreateOutputDtos)
}

export const getRestaurantOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDtos = await orderService.getReadyOrders()
    
    res.json(orderCreateOutputDtos)
}


export const takeOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token
    const orderId = idValidator.parse(req.params.id)

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDto = await orderService.takeOrder(orderId)
    
    res.json(orderCreateOutputDto)
}

export const finishOrderDelivery = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)

    const accessToken = req.cookies.access_token
    const orderId = idValidator.parse(req.params.id)

    const user = await authenticate(accessToken)

    const orderService = orderServiceFactory.createOrderService()

    await authenticateService(orderService, userRepositoryFactory, user)
    const orderCreateOutputDto = await orderService.finishOrderDelivery(orderId)
    
    res.json(orderCreateOutputDto)
}