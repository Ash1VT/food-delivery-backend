interface OrderItemBaseDto {
    quantity: number
}

interface OrderItemBaseOutputDto extends OrderItemBaseDto {
    id: string
    menuItemName: string
    menuItemImageUrl: string
    menuItemPrice: number
}
    
export interface OrderItemGetOutputDto extends OrderItemBaseOutputDto {
    orderId: string
}

export interface OrderItemCreateInputDto extends OrderItemBaseDto {
    menuItemId: bigint
}

export interface OrderItemCreateOutputDto extends OrderItemBaseOutputDto {
    orderId: string
}