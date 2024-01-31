interface MenuItemBaseDTO {
    name: string
    imageUrl: string
    price: number
}

interface MenuItemBaseOutputDTO extends MenuItemBaseDTO {
    id: number
    restaurantId: number
}

export interface MenuItemGetOutputDTO extends MenuItemBaseOutputDTO {}

export interface MenuItemCreateInputDTO extends MenuItemBaseDTO {
    id: number
    restaurantId: number
}

export interface MenuItemCreateOutputDTO extends MenuItemBaseOutputDTO {}

export interface MenuItemUpdateInputDTO extends MenuItemBaseDTO {}

export interface MenuItemUpdateOutputDTO extends MenuItemBaseOutputDTO {}