import { Request, Response } from "express"
import { getPrismaClient } from "@src/core/setup/prisma"
import PrismaCustomerAddressServiceFactory from "@src/modules/addresses/services/factories/implementations/prisma/PrismaCustomerAddressServiceFactory"
import { authenticateWithPrisma } from "@src/modules/authentication/utils/prisma/auhenticateWithPrisma"
import { customerAddressApprovalStatusValidator, customerAddressCreateValidator } from "@src/modules/addresses/validators/customerAddress.validators"
import { idValidator } from "@src/core/validators/idValidator"

export const getCustomerAddresses = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerId = idValidator.parse(req.params.customerId)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    const customerAddressesGetOutputDtos = await customerAddressService.getCustomerAddresses(customerId)
    
    res.status(200).json(customerAddressesGetOutputDtos)
}

export const getCustomersAddresses = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const approvalStatus = customerAddressApprovalStatusValidator.parse(req.query.approvalStatus)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    const customersAddressesGetOutputDtos = await customerAddressService.getCustomersAddresses(approvalStatus)
    
    res.status(200).json(customersAddressesGetOutputDtos)
}

export const updateCustomerAddress = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerAddressId = idValidator.parse(req.params.customerAddressId)

    const customerAddressUpdateInputDto = customerAddressCreateValidator.parse(req.body)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    const customerAddressUpdateDto = await customerAddressService.updateCustomerAddress(customerAddressId, customerAddressUpdateInputDto)
    
    res.status(200).json(customerAddressUpdateDto)
}

export const approveCustomerAddress = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerAddressId = idValidator.parse(req.params.customerAddressId)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    await customerAddressService.approveCustomerAddress(customerAddressId)
    
    res.status(200).json({})
}

export const rejectCustomerAddress = async (req: Request, res: Response) => {
    const prismaClient = getPrismaClient()

    const customerAddressId = idValidator.parse(req.params.customerAddressId)

    const customerAddressServiceFactory = new PrismaCustomerAddressServiceFactory(prismaClient)
    const customerAddressService = customerAddressServiceFactory.createCustomerAddressService()

    await authenticateWithPrisma(req, prismaClient, customerAddressService)

    await customerAddressService.rejectCustomerAddress(customerAddressId)
    
    res.status(200).json({})
}