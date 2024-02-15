import { orderCreateValidator, orderStatusValidator } from '@src/modules/orders/validators/order.validators';
import { getPrismaClient } from "./../../../core/setup/prisma";
import { Request, Response } from "express"
import PrismaOrderServiceFactory from '../services/factories/implementations/prisma/PrismaOrderServiceFactory';
import { idValidator } from '@src/core/validators/idValidator';
import { authenticateWithPrisma } from '@src/modules/authentication/utils/prisma/auhenticateWithPrisma';

export const makeOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderCreateInputDto = orderCreateValidator.parse(req.body)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()
    
    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderCreateOutputDto = await orderService.makeOrder(orderCreateInputDto)
    
    res.status(201).json(orderCreateOutputDto)
}

export const getAllOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderStatus = orderStatusValidator.parse(req.query.status)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getMany(orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getCurrentCustomerOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderStatus = orderStatusValidator.parse(req.query.status)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getCurrentCustomerOrders(orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getCurrentCourierOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
   
    const orderStatus = orderStatusValidator.parse(req.query.status)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getCurrentCourierOrders(orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getAvailableForDeliveryOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getReadyOrders()
    
    res.status(200).json(orderGetOutputDtos)
}

export const getRestaurantOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderStatus = orderStatusValidator.parse(req.query.status)
    const restaurantId = idValidator.parse(req.params.id)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getRestaurantOrders(restaurantId, orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}


export const takeOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.id)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.takeOrder(orderId)
    
    res.status(200).json({})
}

export const finishOrderDelivery = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.id)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.finishOrderDelivery(orderId)
    
    res.status(200).json({})
}

