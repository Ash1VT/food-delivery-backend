interface RestaurantBaseDto {}

interface RestaurantBaseOutputDto extends RestaurantBaseDto {
    id: string
}

export interface RestaurantGetOutputDto extends RestaurantBaseOutputDto {}

export interface RestaurantCreateInputDto extends RestaurantBaseDto {
    id: bigint
}

export interface RestaurantCreateOutputDto extends RestaurantBaseOutputDto {}