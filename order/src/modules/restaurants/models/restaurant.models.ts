export type RestaurantModel = {
    id: bigint
    isActive: boolean
}

export type RestaurantCreateInput = {
    id: bigint
    isActive: boolean
}

export type RestaurantUpdateInput = {
    id?: bigint
    isActive?: boolean
}