export type OrderItemAdditionalData = {
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
    orderId: number
}

export type OrderItemWithOrderAdditionalData = {
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
}

export type OrderAdditionalData = {
    customerId: bigint,
    promocodeName?: string
    promocodeDiscount?: number,
    supposedDeliveryTime: Date,
    totalPrice: number,
    decountedPrice: number
    itemsAdditionalData: OrderItemWithOrderAdditionalData[]
}