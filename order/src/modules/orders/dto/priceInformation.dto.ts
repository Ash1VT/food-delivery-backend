interface PriceInformationBaseDto {
    orderItemsPrice: number
    promocodeName?: string
    promocodeDiscount?: number
    decountedPrice: number
    deliveryPrice?: number
    totalPrice: number
}

interface PriceInformationBaseOutputDto extends PriceInformationBaseDto {
    id: string
}


export interface PriceInformationGetOutputDto extends PriceInformationBaseOutputDto {

}


export interface PriceInformationCreateOutputDto extends PriceInformationBaseOutputDto {

}

export interface PriceInformationUpdateOutputDto extends PriceInformationBaseOutputDto {

}