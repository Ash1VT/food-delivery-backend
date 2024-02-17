import { OrderItemCreateInputDto, OrderItemCreateOutputDto, OrderItemGetOutputDto } from "./orderItem.dto"

interface OrderBaseDto {
}

interface OrderBaseOutputDto extends OrderBaseDto {
    id: string
    customerId: string
    courierId?: string
    restaurantId: string
    promocodeName?: string
    promocodeDiscount?: number
    promotionId?: string
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
    restaurantId: bigint
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