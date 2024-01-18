export type OrderItemModel = {
    id: bigint
    menuItemId: bigint
    orderId: bigint
    quantity: number
}

export type OrderItemCreateInput = {
    id?: bigint
    menuItemId: bigint
    orderId: bigint
    quantity: number
}

export type OrderItemUpdateInput = {
    id?: bigint
    menuItemId?: bigint
    orderId?: bigint
    quantity?: number
}