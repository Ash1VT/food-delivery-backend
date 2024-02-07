import { OrderItemCreateInputDTO, OrderItemCreateOutputDTO, OrderItemGetOutputDTO } from "./orderItem"

interface OrderBaseDTO {
    restaurantId: bigint
}

interface OrderBaseOutputDTO extends OrderBaseDTO {
    id: bigint
    customerId: bigint
    courierId?: bigint
    promocodeName?: string
    promocodeDiscount?: number
    promotionId?: bigint
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
    promotionId?: bigint
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