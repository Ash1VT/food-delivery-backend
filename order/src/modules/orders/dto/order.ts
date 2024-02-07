import { OrderItemCreateInputDTO, OrderItemCreateOutputDTO, OrderItemGetOutputDTO } from "./orderItem"

interface OrderBaseDTO {
    restaurantId: number
}

interface OrderBaseOutputDTO extends OrderBaseDTO {
    id: number
    customerId: number
    courierId?: number
    promocodeName?: string
    promocodeDiscount?: number
    promotionId?: number
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
    items: OrderItemCreateInputDTO[]
}

export interface OrderCreateOutputDTO extends OrderBaseOutputDTO {
    items?: OrderItemCreateOutputDTO[]
}

// export interface OrderUpdateInputDTO {

// }

// export interface OrderUpdateOutputDTO {

// }