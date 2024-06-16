import { orderCreateValidator, orderStatusValidator, orderUpdateValidator } from '@src/modules/orders/validators/order.validators';
import { getPrismaClient } from "./../../../core/setup/prisma";
import { Request, Response } from "express"
import PrismaOrderServiceFactory from '../services/factories/implementations/prisma/PrismaOrderServiceFactory';
import { idValidator } from '@src/core/validators/idValidator';
import { authenticateWithPrisma } from '@src/modules/authentication/utils/prisma/auhenticateWithPrisma';
import { deliveryTypeValidator } from '../validators/deliveryType.validators';
import appSettings from '@src/core/setup/settings/appSettings';

export const makeOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderCreateInputDto = orderCreateValidator.parse(req.body)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()
    
    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderCreateOutputDto = await orderService.makeOrder(orderCreateInputDto)
    
    res.status(201).json(orderCreateOutputDto)
}

export const updateOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)
    const orderUpdateInputDto = orderUpdateValidator.parse(req.body)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()
    
    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderUpdateOutputDto = await orderService.updateOrder(orderId, orderUpdateInputDto)
    
    res.status(201).json(orderUpdateOutputDto)
}

export const placeOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()
    
    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDto = await orderService.placeOrder(orderId)
    
    res.status(201).json(orderGetOutputDto)
}

export const getAllOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderStatus = orderStatusValidator.parse(req.query.status)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getMany(orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderId = idValidator.parse(req.params.orderId)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDto = await orderService.getOrder(orderId)
    
    res.status(200).json(orderGetOutputDto)
}

export const getCurrentCustomerOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderStatus = orderStatusValidator.parse(req.query.status)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getCurrentCustomerOrders(orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getCurrentCourierOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
   
    const orderStatus = orderStatusValidator.parse(req.query.status)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getCurrentCourierOrders(orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getAvailableForDeliveryOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getReadyOrders()
    
    res.status(200).json(orderGetOutputDtos)
}

export const confirmOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.confirmOrder(orderId)
    
    res.status(200).json({})
}

export const prepareOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.prepareOrder(orderId)
    
    res.status(200).json({})
}

export const cancelOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.cancelOrder(orderId)
    
    res.status(200).json({})
}


export const takeOrder = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)
    const deliveryType = deliveryTypeValidator.parse(req.query.deliveryType)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.takeOrder(orderId, deliveryType)
    
    res.status(200).json({})
}

export const finishOrderDelivery = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const orderId = idValidator.parse(req.params.orderId)
    
    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    await orderService.finishOrderDelivery(orderId)
    
    res.status(200).json({})
}

