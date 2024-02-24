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


export interface RestaurantManagerUpdateInputDto extends RestaurantManagerBaseDto {
    restaurantId: bigint
}

export interface RestaurantManagerUpdateOutputDto extends RestaurantManagerBaseOutputDto {
    restaurantId?: string
}