import { getPrismaClient } from "@src/core/setup/prisma";
import { RestaurantCreatedBaseEvent, RestaurantUpdatedBaseEvent } from "../abstractions/restaurant.events";
import PrismaRestaurantServiceFactory from "@src/modules/restaurants/services/factories/implementations/prisma/PrismaRestaurantServiceFactory";

export class RestaurantCreatedPrismaEvent extends RestaurantCreatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const restaurantServiceFactory = new PrismaRestaurantServiceFactory(prismaClient)
        super(data, restaurantServiceFactory)
    }
}

export class RestaurantUpdatedPrismaEvent extends RestaurantUpdatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const restaurantServiceFactory = new PrismaRestaurantServiceFactory(prismaClient)
        super(data, restaurantServiceFactory)
    }
}