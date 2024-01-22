export type CourierCreateDbModelAdditionalData = {}

export type CourierCreateDtoModelAdditionalData = {}

export type CourierGetDtoModelAdditionalData = {}


export type CustomerCreateDbModelAdditionalData = {}

export type CustomerCreateDtoModelAdditionalData = {}

export type CustomerGetDtoModelAdditionalData = {}


export type RestaurantManagerCreateDbModelAdditionalData = {}

export type RestaurantManagerCreateDtoModelAdditionalData = {}

export type RestaurantManagerGetDtoModelAdditionalData = {}


export type ModeratorCreateDbModelAdditionalData = {}

export type ModeratorCreateDtoModelAdditionalData = {}

export type ModeratorGetDtoModelAdditionalData = {}


export type PromocodeCreateDbModelAdditionalData = {}

export type PromocodeCreateDtoModelAdditionalData = {}

export type PromocodeGetDtoModelAdditionalData = {}


export type PromotionCreateDbModelAdditionalData = {}

export type PromotionCreateDtoModelAdditionalData = {}

export type PromotionGetDtoModelAdditionalData = {}


export type OrderItemCreateDbModelAdditionalData = {}

export type OrderItemCreateDtoModelAdditionalData = {}

export type OrderItemGetDtoModelAdditionalData = {}


export type MenuItemCreateDbModelAdditionalData = {}

export type MenuItemCreateDtoModelAdditionalData = {}

export type MenuItemUpdateDbModelAdditionalData = {}

export type MenuItemUpdateDtoModelAdditionalData = {}

export type MenuItemGetDtoModelAdditionalData = {}


export type OrderCreateDbModelAdditionalData = {
    customerId: number,
    promocodeId?: number,
    supposedDeliveryTime: Date,
    totalPrice: number,
    decountedPrice: number
    itemsAdditionalData: OrderItemCreateDbModelAdditionalData[]
}

export type OrderCreateDtoModelAdditionalData = {
    promocode?: string
    itemsAdditionalData: OrderItemCreateDtoModelAdditionalData[]
}

export type OrderGetDtoModelAdditionalData = {
    promocode?: string
    itemsAdditionalData: OrderItemGetDtoModelAdditionalData[]
}


export type RestaurantCreateDbModelAdditionalData = {}

export type RestaurantCreateDtoModelAdditionalData = {}

export type RestaurantGetDtoModelAdditionalData = {}