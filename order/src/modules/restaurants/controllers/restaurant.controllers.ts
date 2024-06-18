import { getPrismaClient } from "@src/core/setup/prisma"
import appSettings from "@src/core/setup/settings/appSettings"
import { idValidator } from "@src/core/validators/idValidator"
import { authenticateWithPrisma } from "@src/modules/authentication/utils/prisma/auhenticateWithPrisma"
import PrismaOrderServiceFactory from "@src/modules/orders/services/factories/implementations/prisma/PrismaOrderServiceFactory"
import { orderStatusValidator } from "@src/modules/orders/validators/order.validators"
import PrismaPromotionServiceFactory from "@src/modules/promotions/services/factories/implementations/prisma/PrismaPromotionServiceFactory"
import { Request, Response } from "express"

export const getRestaurantOrders = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const orderStatus = orderStatusValidator.parse(req.query.status)
    const restaurantId = idValidator.parse(req.params.restaurantId)

    const orderServiceFactory = new PrismaOrderServiceFactory(prismaClient, appSettings.variables.bingApiKey, appSettings.variables.stripeSecretKey)
    const orderService = orderServiceFactory.createOrderService()

    await authenticateWithPrisma(req, prismaClient, orderService)

    const orderGetOutputDtos = await orderService.getRestaurantOrders(restaurantId, orderStatus)
    
    res.status(200).json(orderGetOutputDtos)
}

export const getRestaurantPromocodes = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const restaurantId = idValidator.parse(req.params.restaurantId)
    
    const promotionServiceFactory = new PrismaPromotionServiceFactory(prismaClient)
    const promocodeService = promotionServiceFactory.createPromocodeService()

    await authenticateWithPrisma(req, prismaClient, promocodeService)

    const promocodeGetOutputDtos = await promocodeService.getRestaurantPromocodes(restaurantId)
    
    res.status(200).json(promocodeGetOutputDtos)
}