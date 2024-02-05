interface RestaurantManagerBaseDTO {
    id: number
}

interface RestaurantManagerBaseOutputDTO extends RestaurantManagerBaseDTO {}

export interface RestaurantManagerGetOutputDTO extends RestaurantManagerBaseOutputDTO {
    restaurantId?: number
}

export interface RestaurantManagerCreateInputDTO extends RestaurantManagerBaseDTO {}

export interface RestaurantManagerCreateOutputDTO extends RestaurantManagerBaseOutputDTO {}