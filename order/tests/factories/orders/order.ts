import { OrderItemModel } from '@src/modules/orders/models/orderItem.models';
import { OrderItemWithOrderCreateInput } from '../../../src/modules/orders/models/orderItem.models';
import { OrderStatus } from '@src/modules/orders/models/orderStatus.models';
import { faker } from "@faker-js/faker"
import { PrismaClient } from '@prisma/client';
import moment from "moment"
import { OrderCreateInputDto } from "@src/modules/orders/dto/order.dto"
import { OrderModel, OrderCreateInput, OrderUpdateInput } from "@src/modules/orders/models/order.models"
import { generateOrderItemCreateInputDto, generateOrderItemModel } from './orderItem';
import { getUniqueId } from '@tests/utils/unique';

// Models

export function generateOrderModel(customerId: bigint, restaurantId: bigint, status: OrderStatus, 
                                   itemsCount: number, deliveryInformationId: bigint, promocodeName?: string, promocodeDiscount?: number, 
                                   courierId?: bigint, promotionId?: bigint): OrderModel {
    const orderId = getUniqueId()
    const createdAt = faker.date.recent()
    const supposedDeliveryTime = moment(createdAt).add(faker.number.int({ min: 1, max: 200 }), "m").toDate()

    return {
        id: orderId,
        customerId,
        courierId,
        restaurantId,
        deliveryInformationId,
        status,
        createdAt,
        promocodeName,
        promocodeDiscount,
        promotionId,
        totalPrice: Number(faker.number.float({
            min: 2,
            max: 50
        }).toFixed(2)),
        decountedPrice: Number(faker.number.float({
            min: 2,
            max: 50
        }).toFixed(2)),
        items: itemsCount ? Array.from({length: itemsCount}, () => generateOrderItemModel(orderId)) : undefined
    }
}

export function generateOrderCreateInputModel(customerId: bigint, restaurantId: bigint, deliveryInformationId: bigint, items: OrderItemWithOrderCreateInput[], courierId?: bigint): OrderCreateInput {
    const createdAt = faker.date.recent()
    const supposedDeliveryTime = moment(createdAt).add(faker.number.int({ min: 1, max: 200 }), "m").toDate()
    
    return {
        customerId,
        courierId,
        restaurantId,
        deliveryInformationId,
        createdAt,
        promocodeName: faker.lorem.word(5),
        promocodeDiscount: faker.number.int({
            min: 10,
            max: 100
        }),
        totalPrice: Number(faker.number.float({
            min: 2,
            max: 50
        }).toFixed(2)),
        decountedPrice: Number(faker.number.float({
            min: 2,
            max: 50
        }).toFixed(2)),
        items: {
            create: items
        }
    }
}

export function generateOrderUpdateInputModel(courierId?: bigint): OrderUpdateInput {
    return {
        courierId,
        status: "DELIVERING",
    }
}

// Database Generation

export async function createOrder(client: PrismaClient, customerId: bigint, deliveryInformationId: bigint, restaurantId: bigint, items: OrderItemWithOrderCreateInput[], courierId?: bigint): Promise<OrderModel> {
    const orderData = generateOrderCreateInputModel(customerId, restaurantId, deliveryInformationId, items, courierId)
    return await client.order.create({
        data: orderData
    })
}

// DTOs

export function generateOrderCreateInputDto(restaurantId: bigint, customerAddressId: bigint, menuItemsIds: bigint[], promocode?: string, promotionId?: bigint): OrderCreateInputDto {
    return {
        restaurantId,
        promotionId,
        customerAddressId,
        promocode,
        items: menuItemsIds.map((menuItemId) => generateOrderItemCreateInputDto(menuItemId))
    }
}