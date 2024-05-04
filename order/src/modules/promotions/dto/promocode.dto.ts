interface PromocodeBaseDto {
    discountPercentage: number
    maxUsageCount: number
}

interface PromocodeBaseOutputDto extends PromocodeBaseDto {
    id: string
    nameIdentifier: string
    currentUsageCount: number
    restaurantId: string
    validFrom: string
    validUntil: string
    isActive: boolean
}

export interface PromocodeGetOutputDto extends PromocodeBaseOutputDto {}

export interface PromocodeCreateInputDto extends PromocodeBaseDto {
    restaurantId: bigint
    validFrom: Date
    validUntil: Date
    nameIdentifier: string
}

export interface PromocodeCreateOutputDto extends PromocodeBaseOutputDto {}

export interface PromocodeUpdateInputDto extends PromocodeBaseDto {
    validFrom: Date
    validUntil: Date
}

export interface PromocodeUpdateOutputDto extends PromocodeBaseOutputDto {}