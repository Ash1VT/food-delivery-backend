import { OrderItemCreateInputDto, OrderItemCreateOutputDto, OrderItemGetOutputDto } from "./orderItem.dto"

interface OrderBaseDto {
    restaurantId: bigint
}

interface OrderBaseOutputDto extends OrderBaseDto {
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


export interface OrderGetOutputDto extends OrderBaseOutputDto {
    items?: OrderItemGetOutputDto[]
}

export interface OrderCreateInputDto extends OrderBaseDto {
    promotionId?: bigint
    promocode?: string
    items: OrderItemCreateInputDto[]
}

export interface OrderCreateOutputDto extends OrderBaseOutputDto {
    items?: OrderItemCreateOutputDto[]
}

// export interface OrderUpdateInputDTO {

// }

// export interface OrderUpdateOutputDTO {

// }