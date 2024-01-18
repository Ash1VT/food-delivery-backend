import { OrderItemCreateOutputDTO, OrderItemGetOutputDTO } from "./orderItem"

interface OrderBaseDTO {
    customerId: number
    restaurantId: number
}

interface OrderBaseOutputDTO extends OrderBaseDTO {
    id: number
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
    items: OrderItemGetOutputDTO[]
}

export interface OrderCreateInputDTO extends OrderBaseDTO {
    promotionId?: number
}

export interface OrderCreateOutputDTO extends OrderBaseOutputDTO {
    items: OrderItemCreateOutputDTO[]
}

// export interface OrderUpdateInputDTO {

// }

// export interface OrderUpdateOutputDTO {

// }