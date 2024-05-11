import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "@src/modules/restaurants/models/restaurant.models"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generateRestaurantModel(): RestaurantModel {
    return {
        id: getUniqueId(),
        address: faker.location.streetAddress(),
        isActive: true
    }
}

export function generateRestaurantCreateInputModel(): RestaurantCreateInput {
    return {
        id: getUniqueId(),
        address: faker.location.streetAddress(),
        isActive: true
    }
}

export function generateRestaurantUpdateInputModel(): RestaurantUpdateInput {
    return {
        id: getUniqueId()
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

// export function generateRestaurantCreateInputDto(restaurantManagerId: bigint): RestaurantCreateInputDto {
//     return {
//         id: getUniqueId(),
//         restaurantManagerId,
//         isActive: true
//     }
// }