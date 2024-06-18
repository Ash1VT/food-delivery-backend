export interface PaymentInformationBaseDto {
    paymentIntentId: string
    clientSecretKey: string
}

export interface PaymentInformationBaseOutputDto extends PaymentInformationBaseDto {
    id: string
}

export interface PaymentInformationGetOutputDto extends PaymentInformationBaseOutputDto {}

export interface PaymentInformationCreateOutputDto extends PaymentInformationBaseOutputDto {}

export interface PaymentInformationUpdateOutputDto extends PaymentInformationBaseOutputDto {}