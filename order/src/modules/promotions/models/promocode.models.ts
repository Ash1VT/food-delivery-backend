export type PromocodeModel = {
    id: bigint
    nameIdentifier: string
    discountPercentage: number
    validFrom: Date
    validUntil: Date
    maxUsageCount: number
    currentUsageCount: number
    restaurantId: bigint
    isActive: boolean
}

export type PromocodeCreateInput = {
    id?: bigint
    nameIdentifier: string
    discountPercentage: number
    validFrom: Date
    validUntil: Date
    maxUsageCount: number
    restaurantId: bigint
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
    restaurantId?: bigint
    isActive?: boolean
}