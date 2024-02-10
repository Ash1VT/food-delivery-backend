interface CourierBaseDto {
    id: bigint
}

interface CourierBaseOutputDto extends CourierBaseDto {}

export interface CourierGetOutputDto extends CourierBaseOutputDto {}

export interface CourierCreateInputDto extends CourierBaseDto {}

export interface CourierCreateOutputDto extends CourierBaseOutputDto {}