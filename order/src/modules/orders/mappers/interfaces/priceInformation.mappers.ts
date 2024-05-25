import { DeliveryInformationCreateOutputDto, DeliveryInformationGetOutputDto } from "../../dto/deliveryInformation.dto";
import { PriceInformationCreateOutputDto, PriceInformationGetOutputDto } from "../../dto/priceInformation.dto";
import { DeliveryInformationModel } from "../../models/deliveryInformation.models";
import { PriceInformationModel } from "../../models/priceInformation.models";

export interface IPriceInformationGetMapper {
    toDto(dbModel: PriceInformationModel): PriceInformationGetOutputDto
}

export interface IPriceInformationCreateMapper {
    toDto(dbModel: PriceInformationModel): PriceInformationCreateOutputDto
}

export interface IPriceInformationUpdateMapper {
    toDto(dbModel: PriceInformationModel): PriceInformationCreateOutputDto
}