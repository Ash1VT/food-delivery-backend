import { getPrismaClient } from "@src/core/setup/prisma";
import { ModeratorCreatedBaseEvent } from "../abstractions/moderator.events";
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";

export class ModeratorCreatedPrismaEvent extends ModeratorCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
        super(data, userRepositoryFactory)
    }
}
