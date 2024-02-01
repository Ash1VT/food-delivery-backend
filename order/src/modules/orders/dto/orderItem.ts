interface OrderItemBaseDTO {
    quantity: number
}

interface OrderItemBaseOutputDTO extends OrderItemBaseDTO {
    id: number
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
}
    
export interface OrderItemGetOutputDTO extends OrderItemBaseOutputDTO {
    orderId: number
}

export interface OrderItemCreateInputDTO extends OrderItemBaseDTO {
    menuItemId: number
}

export interface OrderItemCreateOutputDTO extends OrderItemBaseOutputDTO {
    orderId: number
}