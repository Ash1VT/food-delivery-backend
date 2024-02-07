interface CourierBaseDTO {
    id: bigint
}

interface CourierBaseOutputDTO extends CourierBaseDTO {}

export interface CourierGetOutputDTO extends CourierBaseOutputDTO {}

export interface CourierCreateInputDTO extends CourierBaseDTO {}

export interface CourierCreateOutputDTO extends CourierBaseOutputDTO {}