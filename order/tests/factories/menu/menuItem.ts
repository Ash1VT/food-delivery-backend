import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { MenuItemCreateInputDto, MenuItemUpdateInputDto } from "@src/modules/menu/dto/menuItem.dto"
import { MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput } from "@src/modules/menu/models/menuItem.models"
import { createRestaurant, generateRestaurantModel } from "../restaurants/restaurant"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generateMenuItemModel(restaurantId: bigint): MenuItemModel {

    return {
        id: getUniqueId(),
        name: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        imageUrl: faker.image.url(),
        price: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        restaurantId
    }
}

export function generateMenuItemCreateInputModel(restaurantId: bigint): MenuItemCreateInput {
    
    return {
        id: getUniqueId(),
        name: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        imageUrl: faker.image.url(),
        price: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        restaurantId
    }
}

export function generateMenuItemUpdateInputModel(restaurantId?: bigint): MenuItemUpdateInput {

    return {
        id: getUniqueId(),
        name: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        imageUrl: faker.image.url(),
        price: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        restaurantId
    }
}

// Database Generation

export async function createMenuItem(client: PrismaClient, restaurantId: bigint): Promise<MenuItemModel> {

    const menuItemData = generateMenuItemCreateInputModel(restaurantId)
    return await client.menuItem.create({
        data: menuItemData
    })
}

// export async function createManyMenuItems(client: PrismaClient, restaurantIds: bigint[]): Promise<MenuItemModel[]> {
//     return await Promise.all(
//         restaurantIds.map(async (restaurantId) => await createMenuItem(client, restaurantId))
//     )
// }

// DTOs

export function generateMenuItemCreateInputDto(restaurantId: bigint): MenuItemCreateInputDto {
    return {
        id: getUniqueId(),
        name: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        imageUrl: faker.image.url(),
        price: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        restaurantId
    }
}

export function generateMenuItemUpdateInputDto(): MenuItemUpdateInputDto {
    return {
        name: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        imageUrl: faker.image.url(),
        price: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
    }
}