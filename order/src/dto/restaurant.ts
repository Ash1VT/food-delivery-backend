import { OrderGetOutputDTO } from "./order"

interface RestaurantBaseDTO {
    id: number
}

interface RestaurantBaseOutputDTO extends RestaurantBaseDTO {}

export interface RestaurantGetOutputDTO extends RestaurantBaseOutputDTO {
    orders: OrderGetOutputDTO[]
}

export interface RestaurantCreateInputDTO extends RestaurantBaseDTO {}

export interface RestaurantCreateOutputDTO extends RestaurantBaseOutputDTO {}