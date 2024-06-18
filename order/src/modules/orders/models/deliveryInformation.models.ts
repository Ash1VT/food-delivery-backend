import { DeliveryType } from "./deliveryType.models"

export type DeliveryInformationModel = {
    id: bigint
    deliveryType?: DeliveryType | null
    deliveryDistance?: number | null
    supposedDeliveryTime?: number | null

    originAddress: string
    destinationAddress?: string | null

    deliveryAcceptedAt?: Date | null
    actualDeliveryTime?: number | null
    deliveryFinishedAt?: Date | null
}

export type DeliveryInformationCreateInput = {
    id?: bigint
    deliveryType?: DeliveryType | null
    deliveryDistance?: number | null
    supposedDeliveryTime?: number | null

    originAddress: string
    destinationAddress?: string | null
    
    deliveryAcceptedAt?: Date | null
    actualDeliveryTime?: number | null
    deliveryFinishedAt?: Date | null
}


export type DeliveryInformationUpdateInput = {
    id?: bigint
    deliveryType?: DeliveryType | null
    deliveryDistance?: number | null
    supposedDeliveryTime?: number | null
    
    originAddress?: string
    destinationAddress?: string | null
    
    deliveryAcceptedAt?: Date | null
    actualDeliveryTime?: number | null
    deliveryFinishedAt?: Date | null
}