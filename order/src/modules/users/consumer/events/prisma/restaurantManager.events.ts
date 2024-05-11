import { getPrismaClient } from "@src/core/setup/prisma"
import { RestaurantManagerCreatedBaseEvent } from "../abstractions/restaurantManager.events"
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory"

export class RestaurantManagerCreatedPrismaEvent extends RestaurantManagerCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
        super(data, userRepositoryFactory)
    }

}
