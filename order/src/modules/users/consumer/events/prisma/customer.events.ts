import { getPrismaClient } from "@src/core/setup/prisma";
import { CustomerCreatedBaseEvent } from "../abstractions/customer.events";
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";

export class CustomerCreatedPrismaEvent extends CustomerCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
        super(data, userRepositoryFactory)
    }
}
