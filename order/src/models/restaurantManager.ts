export type RestaurantManagerModel = {
    id: bigint
    restaurantId: bigint
}

export type RestaurantManagerCreateInput = {
    id: bigint
    restaurantId: bigint
}

export type RestaurantManagerUpdateInput = {
    id?: bigint
    restaurantId?: bigint
}