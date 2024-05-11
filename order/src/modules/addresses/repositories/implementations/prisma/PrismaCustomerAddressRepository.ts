import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { CustomerAddressDelegate } from "./delegates";
import ICustomerAddressRepository from "../../interfaces/ICustomerAddressRepository";
import { CustomerAddressModel, CustomerAddressCreateInput, CustomerAddressUpdateInput } from "@src/modules/addresses/models/customerAddress.models";
import { CustomerAddressApprovalStatus } from "@src/modules/addresses/models/customerAddressApprovalStatus.models";


export default class PrismaCustomerAddressRepository extends PrismaBaseRepository<CustomerAddressDelegate, CustomerAddressModel, CustomerAddressCreateInput, CustomerAddressUpdateInput> implements ICustomerAddressRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.customerAddress)
    }

    public async getCustomerAddresses(customerId: bigint): Promise<CustomerAddressModel[]> {
        return await this.delegate.findMany({
            where: {
                customerId
            }
        })
    }

    public async getCustomersAdresses(status?: CustomerAddressApprovalStatus): Promise<CustomerAddressModel[]> {
        return await this.delegate.findMany({
            where: {
                approvalStatus: status
            }
        })
    }

    
}