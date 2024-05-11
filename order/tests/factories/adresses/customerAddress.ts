import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput } from "@src/modules/menu/models/menuItem.models"
import { createRestaurant, generateRestaurantModel } from "../restaurants/restaurant"
import { getUniqueId } from "@tests/utils/unique"
import { CustomerAddressCreateInput, CustomerAddressModel, CustomerAddressUpdateInput } from "@src/modules/addresses/models/customerAddress.models"

// Models

export function generateCustomerAddressModel(customerId: bigint): CustomerAddressModel {

    return {
        id: getUniqueId(),
        country: faker.location.country(),
        region: faker.location.state(),
        details: faker.location.streetAddress(),
        approvalStatus: "APPROVED",
        customerId
    }
}

export function generateCustomerAddressCreateInputModel(customerId: bigint): CustomerAddressCreateInput {
    
    return {
        country: faker.location.country(),
        region: faker.location.state(),
        details: faker.location.streetAddress(),
        approvalStatus: "APPROVED",
        customerId
    }
}

export function generateCustomerAddressUpdateInputModel(): CustomerAddressUpdateInput {
    return {
        country: faker.location.country(),
        region: faker.location.state(),
        details: faker.location.streetAddress(),
        approvalStatus: "APPROVED",
    }
}

// Database Generation

export async function createCustomerAddress(client: PrismaClient, restaurantId: bigint): Promise<CustomerAddressModel> {

    const customerAddressCreateData = generateCustomerAddressCreateInputModel(restaurantId)
    return await client.customerAddress.create({
        data: customerAddressCreateData
    })
}