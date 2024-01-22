interface OrderItemBaseDTO {
    menuItemId: number
    quantity: number
}

interface OrderItemBaseOutputDTO extends OrderItemBaseDTO {
    id: number
}

export interface OrderItemGetOutputDTO extends OrderItemBaseOutputDTO {
    orderId: number
}

export interface OrderItemCreateInputDTO extends OrderItemBaseDTO {
    orderId: number
}

export interface OrderItemCreateOutputDTO extends OrderItemBaseOutputDTO {
    orderId: number
}

export interface OrderItemWithOrderCreateInputDTO extends OrderItemBaseDTO {}

export interface OrderItemWithOrderCreateOutputDTO extends OrderItemBaseOutputDTO {}
