import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { RestaurantManagerCreateInputDTO } from "@src/modules/users/dto/restaurantManager"
import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "@src/modules/users/models/restaurantManager"
import { createRestaurant, generateRestaurantModel } from "../restaurants/restaurant"
import { getUniqueBigIntId, getUniqueNumberId } from "@tests/utils/unique"

// Models

export function generateRestaurantManagerModel(restaurantId?: bigint): RestaurantManagerModel {

    return {
        id: getUniqueBigIntId(),
        restaurantId
    }
}

export function generateRestaurantManagerCreateInputModel(restaurantId?: bigint): RestaurantManagerCreateInput {

    return {
        id: getUniqueBigIntId(),
        restaurantId
    }
}

export function generateRestaurantManagerUpdateInputModel(restaurantId?: bigint): RestaurantManagerUpdateInput {

    return {
        id: getUniqueBigIntId(),
        restaurantId
    }
}

// Database Generation

export async function createRestaurantManager(client: PrismaClient, restaurantId?: bigint): Promise<RestaurantManagerModel> {

    const restaurantManagerData = generateRestaurantManagerModel(restaurantId)
    return await client.restaurantManager.create({
        data: restaurantManagerData
    })
}

// DTOs

export function generateRestaurantManagerCreateInputDto(): RestaurantManagerCreateInputDTO {
    return {
        id: getUniqueNumberId()
    }
}