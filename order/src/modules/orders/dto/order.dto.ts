import { DeliveryInformationGetOutputDto } from "./deliveryInformation.dto"
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
    totalPrice: number
    decountedPrice: number
}


export interface OrderGetOutputDto extends OrderBaseOutputDto {
    items?: OrderItemGetOutputDto[]
    deliveryInformation?: DeliveryInformationGetOutputDto
}

export interface OrderCreateInputDto extends OrderBaseDto {
    promotionId?: bigint
    restaurantId: bigint
    promocode?: string
    customerAddressId: bigint
    
    items: OrderItemCreateInputDto[]
}

export interface OrderCreateOutputDto extends OrderBaseOutputDto {
    items?: OrderItemCreateOutputDto[]
    deliveryInformation?: DeliveryInformationGetOutputDto
}

// export interface OrderUpdateInputDTO {

// }

// export interface OrderUpdateOutputDTO {

// }