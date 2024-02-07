interface RestaurantManagerBaseDTO {
    id: bigint
}

interface RestaurantManagerBaseOutputDTO extends RestaurantManagerBaseDTO {}

export interface RestaurantManagerGetOutputDTO extends RestaurantManagerBaseOutputDTO {
    restaurantId?: bigint
}

export interface RestaurantManagerCreateInputDTO extends RestaurantManagerBaseDTO {}

export interface RestaurantManagerCreateOutputDTO extends RestaurantManagerBaseOutputDTO {}