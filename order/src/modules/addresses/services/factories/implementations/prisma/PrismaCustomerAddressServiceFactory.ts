import { PrismaClient } from "@prisma/client"
import ICustomerAddressServiceFactory from "../../interfaces/ICustomerAddressServiceFactory"
import ICustomerAddressService from "../../../interfaces/ICustomerAddressService"
import CustomerAddressService from "../../../implementations/CustomerAddressService"
import IUserRepositoryFactory from "@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory"
import { ICustomerAddressMapperFactory } from "@src/modules/addresses/mappers/factories/interfaces/ICustomerAddressMapperFactory"
import ICustomerAddressRepositoryFactory from "@src/modules/addresses/repositories/factories/interfaces/ICustomerAddressRepositoryFactory"
import { CustomerAddressMapperFactory } from "@src/modules/addresses/mappers/factories/implementations/CustomerAddressMapperFactory"
import PrismaCustomerAddressRepositoryFactory from "@src/modules/addresses/repositories/factories/implementations/prisma/PrismaCustomerAddressRepositoryFactory"
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory"

export default class PrismaCustomerAddressServiceFactory implements ICustomerAddressServiceFactory {
    protected customerAddressMapperFactory: ICustomerAddressMapperFactory = new CustomerAddressMapperFactory()
    protected customerAddressRepositoryFactory: ICustomerAddressRepositoryFactory
    protected userRepositoryFactory: IUserRepositoryFactory

    constructor(prismaClient: PrismaClient) {
        this.customerAddressRepositoryFactory = new PrismaCustomerAddressRepositoryFactory(prismaClient)
        this.userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
    }
    public createCustomerAddressService(): ICustomerAddressService {
        return new CustomerAddressService(
            this.customerAddressMapperFactory.createCustomerAddressGetMapper(),
            this.customerAddressMapperFactory.createCustomerAddressCreateMapper(),
            this.customerAddressRepositoryFactory.createCustomerAddressRepository(),
            this.userRepositoryFactory.createCustomerRepository()
        )
    }

}