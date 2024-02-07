interface PromocodeBaseDTO {
    discountPercentage: number
    maxUsageCount: number
}

interface PromocodeBaseOutputDTO extends PromocodeBaseDTO {
    id: bigint
    nameIdentifier: string
    currentUsageCount: number
    restaurantId: bigint
    validFrom: string
    validUntil: string
    isActive: boolean
}

export interface PromocodeGetOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeCreateInputDTO extends PromocodeBaseDTO {
    restaurantId: bigint
    validFrom: Date
    validUntil: Date
    nameIdentifier: string
}

export interface PromocodeCreateOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeUpdateInputDTO extends PromocodeBaseDTO {
    validFrom: Date
    validUntil: Date
}

export interface PromocodeUpdateOutputDTO extends PromocodeBaseOutputDTO {}