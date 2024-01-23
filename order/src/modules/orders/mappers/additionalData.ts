export type OrderItemCreateDbModelAdditionalData = {}

export type OrderItemCreateDtoModelAdditionalData = {}

export type OrderItemGetDtoModelAdditionalData = {}


export type OrderCreateDbModelAdditionalData = {
    customerId: number,
    promocodeId?: number,
    supposedDeliveryTime: Date,
    totalPrice: number,
    decountedPrice: number
    itemsAdditionalData: OrderItemCreateDbModelAdditionalData[]
}

export type OrderCreateDtoModelAdditionalData = {
    promocode?: string
    itemsAdditionalData: OrderItemCreateDtoModelAdditionalData[]
}

export type OrderGetDtoModelAdditionalData = {
    promocode?: string
    itemsAdditionalData: OrderItemGetDtoModelAdditionalData[]
}
