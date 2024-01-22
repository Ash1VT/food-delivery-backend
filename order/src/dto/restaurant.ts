interface RestaurantBaseDTO {
    id: number
}

interface RestaurantBaseOutputDTO extends RestaurantBaseDTO {}

export interface RestaurantGetOutputDTO extends RestaurantBaseOutputDTO {}

export interface RestaurantCreateInputDTO extends RestaurantBaseDTO {}

export interface RestaurantCreateOutputDTO extends RestaurantBaseOutputDTO {}