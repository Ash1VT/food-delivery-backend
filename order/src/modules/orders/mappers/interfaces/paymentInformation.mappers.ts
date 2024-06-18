import { PaymentInformationCreateOutputDto, PaymentInformationGetOutputDto, PaymentInformationUpdateOutputDto } from "../../dto/paymentInformation.dto"
import { PaymentInformationModel } from "../../models/paymentInformation.models"

export interface IPaymentInformationGetMapper {
    toDto(dbModel: PaymentInformationModel): PaymentInformationGetOutputDto
}

export interface IPaymentInformationCreateMapper {
    toDto(dbModel: PaymentInformationModel): PaymentInformationCreateOutputDto
}

export interface IPaymentInformationUpdateMapper {
    toDto(dbModel: PaymentInformationModel): PaymentInformationUpdateOutputDto
}