interface RestaurantBaseDto {
    id: bigint
}

interface RestaurantBaseOutputDto extends RestaurantBaseDto {}

export interface RestaurantGetOutputDto extends RestaurantBaseOutputDto {}

export interface RestaurantCreateInputDto extends RestaurantBaseDto {}

export interface RestaurantCreateOutputDto extends RestaurantBaseOutputDto {}