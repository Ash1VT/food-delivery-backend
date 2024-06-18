import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { CustomerAddressDelegate } from "./delegates";
import ICustomerAddressRepository from "../../interfaces/ICustomerAddressRepository";
import { CustomerAddressModel, CustomerAddressCreateInput, CustomerAddressUpdateInput } from "@src/modules/addresses/models/customerAddress.models";
import { CustomerAddressApprovalStatus } from "@src/modules/addresses/models/customerAddressApprovalStatus.models";
import getLogger from "@src/core/setup/logger";


const logger = getLogger(module)

export default class PrismaCustomerAddressRepository extends PrismaBaseRepository<CustomerAddressDelegate, CustomerAddressModel, CustomerAddressCreateInput, CustomerAddressUpdateInput> implements ICustomerAddressRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.customerAddress)
    }

    public async getCustomerAddresses(customerId: bigint): Promise<CustomerAddressModel[]> {
        const customerAddresses = await this.delegate.findMany({
            where: {
                customerId
            }
        })

        logger.debug(`Retrieved list of CustomerAddress models for Customer with id=${customerId}`)

        return customerAddresses
    }

    public async getCustomersAdresses(status?: CustomerAddressApprovalStatus): Promise<CustomerAddressModel[]> {
        const customerAddresses = await this.delegate.findMany({
            where: {
                approvalStatus: status
            }
        })

        logger.debug(`Retrieved list of CustomerAddress models for Customers with approvalStatus=${status}`)

        return customerAddresses
    }

    
}