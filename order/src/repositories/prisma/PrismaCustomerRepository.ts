import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "./PrismaBaseRepository";
import { CustomerCreateInput, CustomerModel, CustomerUpdateInput } from "../../models/customer";
import ICustomerRepository from "../interfaces/ICustomerRepository";
import { CustomerDelegate } from "../types/prisma/delegate.type";


export default class PrismaCustomerRepository extends PrismaBaseRepository<CustomerDelegate, CustomerModel, CustomerCreateInput, CustomerUpdateInput>
                                              implements ICustomerRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.customer)
    }
    
    public async getOneWithOrders(id: number): Promise<CustomerModel | null> {
        return await this.delegate.findFirst({
            where: {
                id
            },
            include: {
                orders: true
            }
        })
    }

    public async getManyWithOrders(): Promise<CustomerModel[]> {
        return await this.delegate.findMany({
            include: {
                orders: true
            }
        })
    }

}