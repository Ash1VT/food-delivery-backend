import { PrismaClient } from "@prisma/client"
import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "@src/modules/users/models/restaurantManager.models"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generateRestaurantManagerModel(restaurantId?: bigint): RestaurantManagerModel {

    return {
        id: getUniqueId(),
        restaurantId
    }
}

export function generateRestaurantManagerCreateInputModel(restaurantId?: bigint): RestaurantManagerCreateInput {

    return {
        id: getUniqueId(),
        restaurantId
    }
}

export function generateRestaurantManagerUpdateInputModel(restaurantId?: bigint): RestaurantManagerUpdateInput {

    return {
        id: getUniqueId(),
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

// export function generateRestaurantManagerCreateInputDto(): RestaurantManagerCreateInputDto {
//     return {
//         id: getUniqueId()
//     }
// }