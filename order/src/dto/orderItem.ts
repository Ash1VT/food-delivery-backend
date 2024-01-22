interface OrderItemBaseDTO {
    menuItemId: number
    quantity: number
}

interface OrderItemBaseOutputDTO extends OrderItemBaseDTO {
    id: number
}

export interface OrderItemGetOutputDTO extends OrderItemBaseOutputDTO {}

export interface OrderItemCreateInputDTO extends OrderItemBaseDTO {}

export interface OrderItemCreateOutputDTO extends OrderItemBaseOutputDTO {}