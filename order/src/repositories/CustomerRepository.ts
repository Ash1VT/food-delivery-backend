import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository";
import { CustomerCreateInput, CustomerDelegate, CustomerModel, CustomerUpdateInput } from "./types/customer.type";


export default class CustomerRepository extends BaseRepository<CustomerDelegate, CustomerModel, CustomerCreateInput, CustomerUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.customer)
    }
    
}