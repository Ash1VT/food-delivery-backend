import { getPrismaClient } from "@src/core/setup/prisma";
import { CustomerCreatedBaseEvent } from "../abstractions/customer.events";
import PrismaUserServiceFactory from "@src/modules/users/services/factories/implementations/prisma/PrismaUserServiceFactory";

export class CustomerCreatedPrismaEvent extends CustomerCreatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const userServiceFactory = new PrismaUserServiceFactory(prismaClient)
        super(data, userServiceFactory)
    }
}
