interface PromotionBaseDTO {
    id: bigint
}

interface PromotionBaseOutputDTO extends PromotionBaseDTO {}

export interface PromotionGetOutputDTO extends PromotionBaseOutputDTO {}

export interface PromotionCreateInputDTO extends PromotionBaseDTO {}

export interface PromotionCreateOutputDTO extends PromotionBaseOutputDTO {}