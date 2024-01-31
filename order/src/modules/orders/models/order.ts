import { OrderItemModel, OrderItemWithOrderCreateInput } from "./orderItem";
import { OrderStatus } from "./orderStatus";

export type OrderModel = {
    id: bigint
    customerId: bigint
    courierId?: bigint
    restaurantId: bigint
    promocodeName?: string
    promocodeDiscount?: number
    promotionId?: bigint
    status: OrderStatus
    createdAt: Date
    deliveryAcceptedAt?: Date
    supposedDeliveryTime: Date
    actualDeliveryTime?: Date
    deliveryFinishedAt?: Date
    totalPrice: number
    decountedPrice: number
    items?: OrderItemModel[]
}

export type OrderCreateInput = {
    id?: bigint
    customerId: bigint
    courierId?: bigint
    restaurantId: bigint
    promocodeName?: string
    promocodeDiscount?: number
    status?: OrderStatus
    createdAt?: Date
    deliveryAcceptedAt?: Date
    supposedDeliveryTime: Date
    actualDeliveryTime?: Date
    deliveryFinishedAt?: Date
    totalPrice: number
    decountedPrice: number
    create?: {
        items: OrderItemWithOrderCreateInput[]
    }
}

export type OrderUpdateInput = {
    id?: bigint
    customerId?: bigint
    courierId?: bigint
    restaurantId?: bigint
    promocodeName?: string
    promocodeDiscount?: number
    status?: OrderStatus
    createdAt?: Date
    deliveryAcceptedAt?: Date
    supposedDeliveryTime?: Date
    actualDeliveryTime?: Date
    deliveryFinishedAt?: Date
    totalPrice?: number
    decountedPrice?: number
}