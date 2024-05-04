interface RestaurantBaseDto {
    isActive: boolean
}

interface RestaurantBaseOutputDto extends RestaurantBaseDto {
    id: string
}

export interface RestaurantGetOutputDto extends RestaurantBaseOutputDto {}

export interface RestaurantCreateInputDto extends RestaurantBaseDto {
    id: bigint
    restaurantManagerId: bigint
}

export interface RestaurantCreateOutputDto extends RestaurantBaseOutputDto {}

export interface RestaurantUpdateInputDto extends RestaurantBaseDto {}

export interface RestaurantUpdateOutputDto extends RestaurantBaseOutputDto {}