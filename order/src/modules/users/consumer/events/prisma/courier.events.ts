import { getPrismaClient } from "@src/core/setup/prisma";
import { CourierCreatedBaseEvent } from "../abstractions/courier.events";
import PrismaUserServiceFactory from "@src/modules/users/services/factories/implementations/prisma/PrismaUserServiceFactory";

export class CourierCreatedPrismaEvent extends CourierCreatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const userServiceFactory = new PrismaUserServiceFactory(prismaClient)
        super(data, userServiceFactory)
    }
}
