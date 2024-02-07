interface MenuItemBaseDTO {
    name: string
    imageUrl: string
    price: number
}

interface MenuItemBaseOutputDTO extends MenuItemBaseDTO {
    id: bigint
    restaurantId: bigint
}

export interface MenuItemGetOutputDTO extends MenuItemBaseOutputDTO {}

export interface MenuItemCreateInputDTO extends MenuItemBaseDTO {
    id: bigint
    restaurantId: bigint
}

export interface MenuItemCreateOutputDTO extends MenuItemBaseOutputDTO {}

export interface MenuItemUpdateInputDTO extends MenuItemBaseDTO {}

export interface MenuItemUpdateOutputDTO extends MenuItemBaseOutputDTO {}