import { OrderGetOutputDTO } from "./order"

interface CourierBaseDTO {
    id: number
}

interface CourierBaseOutputDTO extends CourierBaseDTO {}

export interface CourierGetOutputDTO extends CourierBaseOutputDTO {
    orders: OrderGetOutputDTO[]
}

export interface CourierCreateInputDTO extends CourierBaseDTO {}

export interface CourierCreateOutputDTO extends CourierBaseOutputDTO {}