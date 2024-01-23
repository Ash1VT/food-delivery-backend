import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "../../../../base/repositories/PrismaBaseRepository";
import { CustomerCreateInput, CustomerModel, CustomerUpdateInput } from "../../models/customer";
import ICustomerRepository from "../interfaces/ICustomerRepository";
import { CustomerDelegate } from "./delegates";


export default class PrismaCustomerRepository extends PrismaBaseRepository<CustomerDelegate, CustomerModel, CustomerCreateInput, CustomerUpdateInput>
                                              implements ICustomerRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.customer)
    }

}