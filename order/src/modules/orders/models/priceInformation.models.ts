export type PriceInformationModel = {
    id: bigint
    orderItemsPrice: number
    promocodeName?: string | null
    promocodeDiscount?: number | null
    deliveryPrice?: number | null
    decountedPrice: number
    totalPrice: number
}

export type PriceInformationCreateInput = {
    id?: bigint
    orderItemsPrice: number
    promocodeName?: string | null
    promocodeDiscount?: number | null
    decountedPrice: number
    deliveryPrice?: number | null
    totalPrice: number
}

export type PriceInformationUpdateInput = {
    id?: bigint
    orderItemsPrice?: number
    promocodeName?: string | null
    promocodeDiscount?: number | null
    totalPrice?: number
    decountedPrice?: number
    deliveryPrice?: number | null
}