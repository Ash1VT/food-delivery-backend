import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { RestaurantCreateInputDTO } from "@src/modules/restaurants/dto/restaurant"
import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "@src/modules/restaurants/models/restaurant"
import { getUniqueBigIntId, getUniqueNumberId } from "@tests/utils/unique"

// Models

export function generateRestaurantModel(): RestaurantModel {
    return {
        id: getUniqueBigIntId()
    }
}

export function generateRestaurantCreateInputModel(): RestaurantCreateInput {
    return {
        id: getUniqueBigIntId()
    }
}

export function generateRestaurantUpdateInputModel(): RestaurantUpdateInput {
    return {
        id: getUniqueBigIntId()
    }
}

// Database Generation

export async function createRestaurant(client: PrismaClient): Promise<RestaurantModel> {
    const restaurantData = generateRestaurantCreateInputModel()
    return await client.restaurant.create({
        data: restaurantData
    })
}

// export async function createManyRestaurants(client: PrismaClient, count: number): Promise<RestaurantModel[]> {
//     return await Promise.all(
//         Array.from({length: count}, async () => await createRestaurant(client))
//     )
// }

// DTOs

export function generateRestaurantCreateInputDto(): RestaurantCreateInputDTO {
    return {
        id: getUniqueNumberId()
    }
}