import getLogger from "@src/core/setup/logger";
import { DeliveryInformationCreateOutputDto, DeliveryInformationGetOutputDto, DeliveryInformationUpdateOutputDto } from "../../dto/deliveryInformation.dto";
import { DeliveryInformationModel } from "../../models/deliveryInformation.models";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper, IDeliveryInformationUpdateMapper } from "../interfaces/deliveryInformation.mappers";


const logger = getLogger(module)

export class DeliveryInformationGetMapper implements IDeliveryInformationGetMapper {

    toDto(dbModel: DeliveryInformationModel): DeliveryInformationGetOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toISOString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toISOString(),
        }

        logger.debug(`Mapped database DeliveryInformationModel with id=${dbModel.id} to DeliveryInformationGetOutputDto`)

        return data
    }

}

export class DeliveryInformationCreateMapper implements IDeliveryInformationCreateMapper {
    toDto(dbModel: DeliveryInformationModel): DeliveryInformationCreateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toISOString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toISOString()
        }

        logger.debug(`Mapped database DeliveryInformationModel with id=${dbModel.id} to DeliveryInformationCreateOutputDto`)

        return data
    }
}


export class DeliveryInformationUpdateMapper implements IDeliveryInformationUpdateMapper {
    toDto(dbModel: DeliveryInformationModel): DeliveryInformationUpdateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toISOString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toISOString()
        }

        logger.debug(`Mapped database DeliveryInformationModel with id=${dbModel.id} to DeliveryInformationUpdateOutputDto`)
        
        return data
    }
}