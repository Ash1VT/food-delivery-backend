import { PrismaClient } from "@prisma/client";
import ICustomerAddressRepositoryFactory from "../../interfaces/ICustomerAddressRepositoryFactory";
import ICustomerAddressRepository from "../../../interfaces/ICustomerAddressRepository";
import PrismaCustomerAddressRepository from "../../../implementations/prisma/PrismaCustomerAddressRepository";

export default class PrismaCustomerAddressRepositoryFactory implements ICustomerAddressRepositoryFactory {
    
    constructor(
        protected prismaClient: PrismaClient
    ) {}
    
    public createCustomerAddressRepository(): ICustomerAddressRepository {
        return new PrismaCustomerAddressRepository(this.prismaClient)
    }

}