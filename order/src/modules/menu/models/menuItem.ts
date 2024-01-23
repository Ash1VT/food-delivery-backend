export type MenuItemModel = {
    id: bigint
    price: number
    restaurantId: bigint
}

export type MenuItemCreateInput = {
    id: bigint
    price: number
    restaurantId: bigint
}

export type MenuItemUpdateInput = {
    id?: bigint
    price?: number
    restaurantId?: bigint
}