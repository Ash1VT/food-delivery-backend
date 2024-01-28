export type PromocodeModel = {
    id: bigint
    nameIdentifier: string
    discountPercentage: number
    validFrom: Date
    validUntil: Date
    maxUsageCount: number
    currentUsageCount: number
    isActive: boolean
}

export type PromocodeCreateInput = {
    id?: bigint
    nameIdentifier: string
    discountPercentage: number
    validFrom: Date
    validUntil: Date
    maxUsageCount: number
    currentUsageCount?: number
}

export type PromocodeUpdateInput = {
    id?: bigint
    nameIdentifier?: string
    discountPercentage?: number
    validFrom?: Date
    validUntil?: Date
    maxUsageCount?: number
    currentUsageCount?: number
    isActive?: boolean
}