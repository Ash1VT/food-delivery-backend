export type OrderItemModel = {
    id: bigint
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
    orderId: bigint
    quantity: number
}

export type OrderItemCreateInput = {
    id?: bigint
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
    orderId: bigint
    quantity: number
}

export type OrderItemWithOrderCreateInput = {
    id?: bigint
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
    quantity: number
}

export type OrderItemUpdateInput = {
    id?: bigint
    menuItemName?: string
    menuItemImageUrl?: string
    menuItemPrice?: number
    orderId?: bigint
    quantity?: number
}