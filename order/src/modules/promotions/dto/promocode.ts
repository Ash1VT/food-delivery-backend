interface PromocodeBaseDTO {
    discountPercentage: number
    validFrom: string
    validUntil: string
    maxUsageCount: number
}

interface PromocodeBaseOutputDTO extends PromocodeBaseDTO {
    id: bigint
    nameIdentifier: string
    currentUsageCount: number
    restaurantId: bigint
    isActive: boolean
}

export interface PromocodeGetOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeCreateInputDTO extends PromocodeBaseDTO {
    restaurantId: bigint
    nameIdentifier: string
}

export interface PromocodeCreateOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeUpdateInputDTO extends PromocodeBaseDTO {}

export interface PromocodeUpdateOutputDTO extends PromocodeBaseOutputDTO {}