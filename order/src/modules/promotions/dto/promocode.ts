interface PromocodeBaseDTO {
    discountPercentage: number
    validFrom: string
    validUntil: string
    maxUsageCount: number
}

interface PromocodeBaseOutputDTO extends PromocodeBaseDTO {
    id: number
    nameIdentifier: string
    currentUsageCount: number
    isActive: boolean
}

export interface PromocodeGetOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeCreateInputDTO extends PromocodeBaseDTO {
    nameIdentifier: string
}

export interface PromocodeCreateOutputDTO extends PromocodeBaseOutputDTO {}

export interface PromocodeUpdateInputDTO extends PromocodeBaseDTO {}

export interface PromocodeUpdateOutputDTO extends PromocodeBaseOutputDTO {}