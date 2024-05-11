import { getPrismaClient } from "@src/core/setup/prisma";
import { CourierCreatedBaseEvent } from "../abstractions/courier.events";
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";

export class CourierCreatedPrismaEvent extends CourierCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
        super(data, userRepositoryFactory)
    }
}
