import { getPrismaClient } from "@src/core/setup/prisma"
import { RestaurantManagerCreatedBaseEvent } from "../abstractions/restaurantManager.events"
import PrismaUserServiceFactory from "@src/modules/users/services/factories/implementations/prisma/PrismaUserServiceFactory"

export class RestaurantManagerCreatedPrismaEvent extends RestaurantManagerCreatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const userServiceFactory = new PrismaUserServiceFactory(prismaClient)
        super(data, userServiceFactory)
    }

}
