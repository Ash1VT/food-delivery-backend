import { getPrismaClient } from "@src/core/setup/prisma";
import { RestaurantCreatedBaseEvent, RestaurantUpdatedBaseEvent } from "../abstractions/restaurant.events";
import PrismaRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/implementations/prisma/PrismaRestaurantRepositoryFactory";

export class RestaurantCreatedPrismaEvent extends RestaurantCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
        super(data, restaurantRepositoryFactory)
    }
}

export class RestaurantUpdatedPrismaEvent extends RestaurantUpdatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
        super(data, restaurantRepositoryFactory)
    }
}