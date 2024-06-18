import { PriceInformationModel } from "../models/priceInformation.models";


export interface OrderPrice {
    orderItemsPrice: number
    discountAmount?: number | null
    decountedPrice: number
    deliveryPrice?: number | null
    totalPrice: number
}

export const calculateOrderPrice = (orderItemsPrice: number, discountAmount?: number | null, deliveryPrice?: number | null): OrderPrice => {
    let totalPrice = orderItemsPrice
    let decountedPrice = orderItemsPrice

    if (discountAmount) {
        decountedPrice = orderItemsPrice * (1 - discountAmount / 100)
        totalPrice = decountedPrice
    }

    if (deliveryPrice) {
        totalPrice += deliveryPrice
    }

    return {
        orderItemsPrice,
        discountAmount,
        decountedPrice,
        deliveryPrice,
        totalPrice
    }
}

