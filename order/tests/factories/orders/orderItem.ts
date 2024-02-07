import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker"
import { OrderItemCreateInputDTO } from "@src/modules/orders/dto/orderItem"
import { OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput, OrderItemWithOrderCreateInput } from "@src/modules/orders/models/orderItem"
import { getUniqueId } from '@tests/utils/unique';

// Models

export function generateOrderItemModel(orderId: bigint): OrderItemModel {
    return {
        id: getUniqueId(),
        menuItemName: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        menuItemImageUrl: faker.image.url(),
        menuItemPrice: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        quantity: faker.number.int({
            max: 10
        }),
        orderId
    }
}

export function generateOrderItemCreateInputModel(orderId: bigint): OrderItemCreateInput {
    return {
        menuItemName: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        menuItemImageUrl: faker.image.url(),
        menuItemPrice: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        quantity: faker.number.int({
            max: 10
        }),
        orderId
    }
}

export function generateOrderItemWithOrderCreateInputModel(): OrderItemWithOrderCreateInput {
    return {
        menuItemName: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        menuItemImageUrl: faker.image.url(),
        menuItemPrice: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        quantity: faker.number.int({
            max: 10
        })
    }
}

export function generateOrderItemUpdateInputModel(orderId?: bigint): OrderItemUpdateInput {
    return {
        menuItemName: faker.lorem.word({
            length: { 
                min: 5, max: 10 
            }
        }),
        menuItemImageUrl: faker.image.url(),
        menuItemPrice: faker.number.float({
            min: 0,
            max: 50,
            fractionDigits: 2
        }),
        quantity: faker.number.int({
            max: 10
        }),
        orderId
    }
}

// Database Generation

export async function createOrderItem(client: PrismaClient, orderId: bigint): Promise<OrderItemModel> {
    const orderItemData = generateOrderItemCreateInputModel(orderId)
    return await client.orderItem.create({
        data: orderItemData
    })
}

// DTOs

export function generateOrderItemCreateInputDto(menuItemId: bigint): OrderItemCreateInputDTO {
    return {
        menuItemId,
        quantity: faker.number.int({
            max: 10
        }),
    }
}