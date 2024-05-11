import { DeliveryInformationCreateOutputDto, DeliveryInformationGetOutputDto } from "../../dto/deliveryInformation.dto";
import { DeliveryInformationModel } from "../../models/deliveryInformation.models";

export interface IDeliveryInformationGetMapper {
    toDto(dbModel: DeliveryInformationModel): DeliveryInformationGetOutputDto
}

export interface IDeliveryInformationCreateMapper {
    toDto(dbModel: DeliveryInformationModel): DeliveryInformationCreateOutputDto
}