import PrismaRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/implementations/prisma/PrismaRestaurantRepositoryFactory"
import { WorkingHoursCreatedBaseEvent, WorkingHoursUpdatedBaseEvent, WorkingHoursDeletedBaseEvent } from "../abstractions/workingHours.events"
import { getPrismaClient } from "@src/core/setup/prisma"

export class WorkingHoursCreatedPrismaEvent extends WorkingHoursCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
        super(data, restaurantRepositoryFactory)
    }
}

export class WorkingHoursUpdatedPrismaEvent extends WorkingHoursUpdatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
        super(data, restaurantRepositoryFactory)
    }
}

export class WorkingHoursDeletedPrismaEvent extends WorkingHoursDeletedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
        super(data, restaurantRepositoryFactory)
    }
}   