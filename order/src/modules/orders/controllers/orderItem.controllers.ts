import { Request, Response } from "express"
import { getPrismaClient } from "@src/core/setup/prisma"
import { idValidator } from "@src/core/validators/idValidator"
import PrismaOrderServiceFactory from "../services/factories/implementations/prisma/PrismaOrderServiceFactory"
import { orderItemCreateValidator } from "../validators/orderItem.validators"


export const getOrderItems = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderId = idValidator.parse(req.params.id)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderItemService = orderServiceFactory.createOrderItemService()

    await authenticateWithPrisma(req, prismaClient, orderItemService)

    const orderItemGetOutputDtos = await orderItemService.getOrderItems(orderId)
    
    res.json(orderItemGetOutputDtos)
}

export const addOrderItem = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderId = idValidator.parse(req.params.id)
    const orderItemCreateInputDto = orderItemCreateValidator.parse(req.body)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient)
    const orderItemService = orderServiceFactory.createOrderItemService()

    await authenticateWithPrisma(req, prismaClient, orderItemService)

    const orderItemCreateOutputDto = await orderItemService.addOrderItem(orderId, orderItemCreateInputDto)
    
    res.json(orderItemCreateOutputDto)
}


