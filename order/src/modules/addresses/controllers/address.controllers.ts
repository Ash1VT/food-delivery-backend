import { Request, Response } from "express"
import { idValidator } from "@src/core/validators/idValidator"
import { authenticateWithPrisma } from "@src/modules/authentication/utils/prisma/auhenticateWithPrisma"
import PrismaCustomerAddressServiceFactory from "../services/factories/implementations/prisma/PrismaCustomerAddressServiceFactory"
import { customerAddressCreateValidator } from "../validators/customerAddress.validators"
import { getPrismaClient } from "@src/core/setup/prisma"

export const getCurrentCustomerAddresses = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    const customerAddressrGetOutputDtos = await customerAddressService.getCurrentCustomerAddresses()
    
    res.status(200).json(customerAddressrGetOutputDtos)
}


export const createCustomerAddress = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerAddressCreateInputDto = customerAddressCreateValidator.parse(req.body)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    const customerAddressrGetOutputDto = await customerAddressService.createCustomerAddress(customerAddressCreateInputDto)
    
    res.status(201).json(customerAddressrGetOutputDto)
}

export const deleteCustomerAddress = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerAddressId = idValidator.parse(req.params.id)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    await customerAddressService.deleteCustomerAddress(customerAddressId)
    
    res.status(200).json({})
}