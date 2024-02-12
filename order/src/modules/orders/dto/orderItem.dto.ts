interface OrderItemBaseDto {
    quantity: number
}

interface OrderItemBaseOutputDto extends OrderItemBaseDto {
    id: bigint
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
}
    
export interface OrderItemGetOutputDto extends OrderItemBaseOutputDto {
    orderId: bigint
}

export interface OrderItemCreateInputDto extends OrderItemBaseDto {
    menuItemId: bigint
}

export interface OrderItemCreateOutputDto extends OrderItemBaseOutputDto {
    orderId: bigint
}