interface PromocodeBaseDTO {
    nameIdentifier: string
    discountPercentage: number
    validFrom: string
    validUntil: string
    maxUsageCount: number
    currentUsageCount: number
}

interface PromocodeBaseOutputDTO extends PromocodeBaseDTO {
    id: number
    isActive: boolean
}

export interface PromocodeGetOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeCreateInputDTO extends PromocodeBaseDTO {}

export interface PromocodeCreateOutputDTO extends PromocodeBaseOutputDTO {}