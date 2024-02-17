interface PromotionBaseDto {}

interface PromotionBaseOutputDto extends PromotionBaseDto {
    id: string
}

export interface PromotionGetOutputDto extends PromotionBaseOutputDto {}

export interface PromotionCreateInputDto extends PromotionBaseDto {
    id: bigint
}

export interface PromotionCreateOutputDto extends PromotionBaseOutputDto {}