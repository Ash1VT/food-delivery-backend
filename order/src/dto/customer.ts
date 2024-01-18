import { OrderGetOutputDTO } from "./order"

interface CustomerBaseDTO {
    id: number
}

interface CustomerBaseOutputDTO extends CustomerBaseDTO {}

export interface CourierGetOutputDTO extends CustomerBaseOutputDTO {
    orders: OrderGetOutputDTO[]
}

export interface CustomerCreateInputDTO extends CustomerBaseDTO {}

export interface CustomerCreateOutputDTO extends CustomerBaseOutputDTO {}