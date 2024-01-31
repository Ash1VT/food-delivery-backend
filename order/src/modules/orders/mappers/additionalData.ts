export type OrderItemAdditionalData = {
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
    itemsAdditionalData: OrderItemAdditionalData[]
}