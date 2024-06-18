export type PaymentInformationModel = {
    id: bigint
    paymentIntentId: string
    clientSecretKey: string
}


export type PaymentInformationCreateInput = {
    id?: bigint
    paymentIntentId: string
    clientSecretKey: string
}


export type PaymentInformationUpdateInput = {
    id?: bigint
    paymentIntentId?: string
    clientSecretKey?: string
}