interface RestaurantManagerBaseDto {}

interface RestaurantManagerBaseOutputDto extends RestaurantManagerBaseDto {
    id: string
}

export interface RestaurantManagerGetOutputDto extends RestaurantManagerBaseOutputDto {
    restaurantId?: string
}

export interface RestaurantManagerCreateInputDto extends RestaurantManagerBaseDto {
    id: bigint
}

export interface RestaurantManagerCreateOutputDto extends RestaurantManagerBaseOutputDto {}