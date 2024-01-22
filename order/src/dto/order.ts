import { OrderItemWithOrderCreateInput } from "../models/orderItem"
import { OrderItemCreateOutputDTO, OrderItemGetOutputDTO } from "./orderItem"

interface OrderBaseDTO {
    restaurantId: number
}

interface OrderBaseOutputDTO extends OrderBaseDTO {
    id: number
    customerId: number
    courierId?: number
    promocode?: string
    status: string
    createdAt: string
    deliveryAcceptedAt?: string
    supposedDeliveryTime: string
    actualDeliveryTime?: string
    deliveryFinishedAt?: string
    totalPrice: number
    decountedPrice: number
}


export interface OrderGetOutputDTO extends OrderBaseOutputDTO {
    items?: OrderItemGetOutputDTO[]
}

export interface OrderCreateInputDTO extends OrderBaseDTO {
    promotionId?: number
    promocode?: string
    items: OrderItemWithOrderCreateInput[]
}

export interface OrderCreateOutputDTO extends OrderBaseOutputDTO {
    items?: OrderItemCreateOutputDTO[]
}

// export interface OrderUpdateInputDTO {

// }

// export interface OrderUpdateOutputDTO {

// }