interface MenuItemBaseDto {
    name: string
    imageUrl: string
    price: number
}

interface MenuItemBaseOutputDto extends MenuItemBaseDto {
    id: string
    restaurantId: string
}

export interface MenuItemGetOutputDto extends MenuItemBaseOutputDto {}

export interface MenuItemCreateInputDto extends MenuItemBaseDto {
    id: bigint
    restaurantId: bigint
}

export interface MenuItemCreateOutputDto extends MenuItemBaseOutputDto {}

export interface MenuItemUpdateInputDto extends MenuItemBaseDto {}

export interface MenuItemUpdateOutputDto extends MenuItemBaseOutputDto {}