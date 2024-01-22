interface RestaurantManagerBaseDTO {
    id: number
}

interface RestaurantManagerBaseOutputDTO extends RestaurantManagerBaseDTO {
    restaurantId: number
}

export interface RestaurantManagerGetOutputDTO extends RestaurantManagerBaseOutputDTO {}

export interface RestaurantManagerCreateInputDTO extends RestaurantManagerBaseDTO {}

export interface RestaurantManagerCreateOutputDTO extends RestaurantManagerBaseOutputDTO {}