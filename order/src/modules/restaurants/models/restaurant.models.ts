export type RestaurantModel = {
    id: bigint
    address: string
    isActive: boolean
}

export type RestaurantCreateInput = {
    id: bigint
    address: string
    isActive: boolean
}

export type RestaurantUpdateInput = {
    id?: bigint
    address?: string
    isActive?: boolean
}