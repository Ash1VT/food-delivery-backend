export type MenuItemModel = {
    id: bigint
    name: string
    imageUrl: string
    price: number
    restaurantId: bigint
}

export type MenuItemCreateInput = {
    id: bigint
    name: string
    imageUrl: string
    price: number
    restaurantId: bigint
}

export type MenuItemUpdateInput = {
    id?: bigint
    name?: string
    imageUrl?: string
    price?: number
    restaurantId?: bigint
}