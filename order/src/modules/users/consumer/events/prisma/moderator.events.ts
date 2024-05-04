import { getPrismaClient } from "@src/core/setup/prisma";
import PrismaUserServiceFactory from "@src/modules/users/services/factories/implementations/prisma/PrismaUserServiceFactory";
import { ModeratorCreatedBaseEvent } from "../abstractions/moderator.events";

export class ModeratorCreatedPrismaEvent extends ModeratorCreatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const userServiceFactory = new PrismaUserServiceFactory(prismaClient)
        super(data, userServiceFactory)
    }
}
