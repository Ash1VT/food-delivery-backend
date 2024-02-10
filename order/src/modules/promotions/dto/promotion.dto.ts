interface PromotionBaseDto {
    id: bigint
}

interface PromotionBaseOutputDto extends PromotionBaseDto {}

export interface PromotionGetOutputDto extends PromotionBaseOutputDto {}

export interface PromotionCreateInputDto extends PromotionBaseDto {}

export interface PromotionCreateOutputDto extends PromotionBaseOutputDto {}