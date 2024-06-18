import { Request, Response } from "express"
import { idValidator } from '@src/core/validators/idValidator';
import { getPrismaClient } from "@src/core/setup/prisma"
import PrismaPromotionServiceFactory from "../services/factories/implementations/prisma/PrismaPromotionServiceFactory";
import { authenticateWithPrisma } from "@src/modules/authentication/utils/prisma/auhenticateWithPrisma";
import { promocodeCreateValidator, promocodeUpdateValidator } from "../validators/promocode.validators";


export const createPromocode = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const promocodeCreateInputDto = promocodeCreateValidator.parse(req.body)
    
    const promotionServiceFactory = new PrismaPromotionServiceFactory(prismaClient)
    const promocodeService = promotionServiceFactory.createPromocodeService()

    await authenticateWithPrisma(req, prismaClient, promocodeService)

    const promocodeCreateOutputDto = await promocodeService.create(promocodeCreateInputDto)
    
    res.status(201).json(promocodeCreateOutputDto)
}

export const updatePromocode = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()
    
    const promocodeId = idValidator.parse(req.params.promocodeId)
    const promocodeUpdateInputDto = promocodeUpdateValidator.parse(req.body)
    
    const promotionServiceFactory = new PrismaPromotionServiceFactory(prismaClient)
    const promocodeService = promotionServiceFactory.createPromocodeService()

    await authenticateWithPrisma(req, prismaClient, promocodeService)

    const promocodeUpdateOutputDto = await promocodeService.update(promocodeId, promocodeUpdateInputDto)
    
    res.status(200).json(promocodeUpdateOutputDto)
}

export const activatePromocode = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const promocodeId = idValidator.parse(req.params.promocodeId)
    
    const promotionServiceFactory = new PrismaPromotionServiceFactory(prismaClient)
    const promocodeService = promotionServiceFactory.createPromocodeService()

    await authenticateWithPrisma(req, prismaClient, promocodeService)

    await promocodeService.activate(promocodeId)
    
    res.status(200).json({})
}

export const deactivatePromocode = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const promocodeId = idValidator.parse(req.params.promocodeId)
    
    const promotionServiceFactory = new PrismaPromotionServiceFactory(prismaClient)
    const promocodeService = promotionServiceFactory.createPromocodeService()

    await authenticateWithPrisma(req, prismaClient, promocodeService)

    await promocodeService.deactivate(promocodeId)
    
    res.status(200).json({})
}
