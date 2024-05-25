import { DeliveryInformationCreateOutputDto, DeliveryInformationGetOutputDto, DeliveryInformationUpdateOutputDto } from "../../dto/deliveryInformation.dto";
import { DeliveryInformationModel } from "../../models/deliveryInformation.models";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper, IDeliveryInformationUpdateMapper } from "../interfaces/deliveryInformation.mappers";

export class DeliveryInformationGetMapper implements IDeliveryInformationGetMapper {

    toDto(dbModel: DeliveryInformationModel): DeliveryInformationGetOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toISOString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toISOString(),
        }
    }

}

export class DeliveryInformationCreateMapper implements IDeliveryInformationCreateMapper {
    toDto(dbModel: DeliveryInformationModel): DeliveryInformationCreateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toISOString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toISOString()
        }
    }
}


export class DeliveryInformationUpdateMapper implements IDeliveryInformationUpdateMapper {
    toDto(dbModel: DeliveryInformationModel): DeliveryInformationUpdateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toISOString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toISOString()
        }
    }
}