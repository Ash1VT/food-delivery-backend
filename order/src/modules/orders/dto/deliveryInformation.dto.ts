import { DeliveryType } from "../models/deliveryType.models"

interface DeliveryInformationBaseDto {
    deliveryType?: DeliveryType | null
    deliveryDistance?: number | null
    supposedDeliveryTime?: number | null

    originAddress: string
    destinationAddress?: string | null

    deliveryAcceptedAt?: string | null
    actualDeliveryTime?: number | null
    deliveryFinishedAt?: string | null
}

interface DeliveryInformationBaseOutputDto extends DeliveryInformationBaseDto {
    id: string
}

export interface DeliveryInformationGetOutputDto extends DeliveryInformationBaseOutputDto {

}

export interface DeliveryInformationCreateOutputDto extends DeliveryInformationBaseOutputDto {

}

export interface DeliveryInformationUpdateOutputDto extends DeliveryInformationBaseOutputDto {

}
