import { OrderItemModel, OrderItemWithOrderCreateInput } from "./orderItem";
import { OrderStatus } from "./orderStatus";

export type OrderModel = {
    id: bigint
    customerId: bigint
    courierId: bigint | null
    restaurantId: bigint
    promocodeId: bigint | null
    promotionId: bigint | null
    status: OrderStatus
    createdAt: Date
    deliveryAcceptedAt: Date | null
    supposedDeliveryTime: Date
    actualDeliveryTime: Date | null
    deliveryFinishedAt: Date | null
    totalPrice: number
    decountedPrice: number
    items?: OrderItemModel[]
}

export type OrderCreateInput = {
    id?: bigint
    customerId: bigint
    courierId?: bigint
    restaurantId: bigint
    promocodeId?: bigint
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
    promocodeId?: bigint
    status?: OrderStatus
    createdAt?: Date
    deliveryAcceptedAt?: Date
    supposedDeliveryTime?: Date
    actualDeliveryTime?: Date
    deliveryFinishedAt?: Date
    totalPrice?: number
    decountedPrice?: number
}