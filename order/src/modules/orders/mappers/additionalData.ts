export type OrderItemAdditionalData = {
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
    orderId: bigint
}

export type OrderItemWithOrderAdditionalData = {
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
}

export type OrderAdditionalData = {
    customerId: bigint
    deliveryInformationId: bigint
    promocodeName?: string
    promocodeDiscount?: number
    totalPrice: number
    decountedPrice: number
    items: OrderItemWithOrderAdditionalData[]
}