interface OrderItemBaseDTO {
    quantity: number
}

interface OrderItemBaseOutputDTO extends OrderItemBaseDTO {
    id: bigint
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
}
    
export interface OrderItemGetOutputDTO extends OrderItemBaseOutputDTO {
    orderId: bigint
}

export interface OrderItemCreateInputDTO extends OrderItemBaseDTO {
    menuItemId: bigint
}

export interface OrderItemCreateOutputDTO extends OrderItemBaseOutputDTO {
    orderId: bigint
}