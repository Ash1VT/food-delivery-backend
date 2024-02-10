interface RestaurantManagerBaseDto {
    id: bigint
}

interface RestaurantManagerBaseOutputDto extends RestaurantManagerBaseDto {}

export interface RestaurantManagerGetOutputDto extends RestaurantManagerBaseOutputDto {
    restaurantId?: bigint
}

export interface RestaurantManagerCreateInputDto extends RestaurantManagerBaseDto {}

export interface RestaurantManagerCreateOutputDto extends RestaurantManagerBaseOutputDto {}