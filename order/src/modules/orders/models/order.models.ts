import { DeliveryInformation } from "@prisma/client";
import { OrderItemModel, OrderItemWithOrderCreateInput } from "./orderItem.models";
import { OrderStatus } from "./orderStatus.models";

export type OrderModel = {
    id: bigint
    customerId: bigint
    courierId?: bigint | null
    restaurantId: bigint
    promocodeName?: string | null
    promocodeDiscount?: number | null
    promotionId?: bigint | null
    deliveryInformationId: bigint
    status: OrderStatus
    createdAt: Date
    totalPrice: number
    decountedPrice: number
    items?: OrderItemModel[]
    deliveryInformation?: DeliveryInformation
}

export type OrderCreateInput = {
    id?: bigint
    customerId: bigint
    courierId?: bigint
    restaurantId: bigint
    promocodeName?: string
    promocodeDiscount?: number
    promotionId?: bigint
    deliveryInformationId: bigint
    status?: OrderStatus
    createdAt?: Date
    totalPrice: number
    decountedPrice: number
    items?: {
        create?: OrderItemWithOrderCreateInput[]
    }
}

export type OrderUpdateInput = {
    id?: bigint
    customerId?: bigint
    courierId?: bigint | null
    restaurantId?: bigint
    promocodeName?: string | null
    promocodeDiscount?: number | null
    deliveryInformationId?: bigint
    status?: OrderStatus
    createdAt?: Date
    totalPrice?: number
    decountedPrice?: number
}