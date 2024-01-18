interface MenuItemBaseDTO {}

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

export interface MenuItemUpdateInputDTO extends MenuItemBaseDTO {
    price: number
}

export interface MenuItemUpdateOutputDTO extends MenuItemBaseOutputDTO {}