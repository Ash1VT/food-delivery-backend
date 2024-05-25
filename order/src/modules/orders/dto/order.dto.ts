import { DeliveryInformationCreateOutputDto, DeliveryInformationGetOutputDto, DeliveryInformationUpdateOutputDto } from "./deliveryInformation.dto"
import { OrderItemCreateInputDto, OrderItemCreateOutputDto, OrderItemGetOutputDto, OrderItemUpdateOutputDto } from "./orderItem.dto"
import { PriceInformationCreateOutputDto, PriceInformationGetOutputDto, PriceInformationUpdateOutputDto } from "./priceInformation.dto"

interface OrderBaseDto {
}

interface OrderBaseOutputDto extends OrderBaseDto {
    id: string
    customerId: string
    courierId?: string
    restaurantId: string
    promocodeName?: string
    promocodeDiscount?: number
    status: string
    
    createdAt: string
}


export interface OrderGetOutputDto extends OrderBaseOutputDto {
    items?: OrderItemGetOutputDto[]
    deliveryInformation?: DeliveryInformationGetOutputDto
    priceInformation?: PriceInformationGetOutputDto
}

export interface OrderCreateInputDto extends OrderBaseDto {
    restaurantId: bigint
    
    items: OrderItemCreateInputDto[]
}

export interface OrderCreateOutputDto extends OrderBaseOutputDto {
    items?: OrderItemCreateOutputDto[]
    deliveryInformation?: DeliveryInformationCreateOutputDto
    priceInformation?: PriceInformationCreateOutputDto
}

export interface OrderUpdateInputDto extends OrderBaseDto {
    promocodeName?: string
    customerAddressId?: bigint
}

export interface OrderUpdateOutputDto extends OrderBaseOutputDto {
    items?: OrderItemUpdateOutputDto[]
    deliveryInformation?: DeliveryInformationUpdateOutputDto
    priceInformation?: PriceInformationUpdateOutputDto
}