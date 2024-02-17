interface CourierBaseDto {}

interface CourierBaseOutputDto extends CourierBaseDto {
    id: string
}

export interface CourierGetOutputDto extends CourierBaseOutputDto {}

export interface CourierCreateInputDto extends CourierBaseDto {
    id: bigint
}

export interface CourierCreateOutputDto extends CourierBaseOutputDto {}