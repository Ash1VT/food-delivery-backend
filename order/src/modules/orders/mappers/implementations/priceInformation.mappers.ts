import getLogger from "@src/core/setup/logger";
import { PriceInformationCreateOutputDto, PriceInformationGetOutputDto, PriceInformationUpdateOutputDto } from "../../dto/priceInformation.dto";
import { PriceInformationModel } from "../../models/priceInformation.models";
import { IPriceInformationCreateMapper, IPriceInformationGetMapper, IPriceInformationUpdateMapper } from "../interfaces/priceInformation.mappers";


const logger = getLogger(module)

export class PriceInformationGetMapper implements IPriceInformationGetMapper {

    toDto(dbModel: PriceInformationModel): PriceInformationGetOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            deliveryPrice: dbModel.deliveryPrice !== null ? dbModel.deliveryPrice : undefined
        }

        logger.debug(`Mapped database PriceInformationModel with id=${dbModel.id} to PriceInformationGetOutputDto`)

        return data
    }

}

export class PriceInformationCreateMapper implements IPriceInformationCreateMapper {

    toDto(dbModel: PriceInformationModel): PriceInformationCreateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            deliveryPrice: dbModel.deliveryPrice !== null ? dbModel.deliveryPrice : undefined
        }

        logger.debug(`Mapped database PriceInformationModel with id=${dbModel.id} to PriceInformationCreateOutputDto`)

        return data
    }
    
}

export class PriceInformationUpdateMapper implements IPriceInformationUpdateMapper {

    toDto(dbModel: PriceInformationModel): PriceInformationUpdateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            deliveryPrice: dbModel.deliveryPrice !== null ? dbModel.deliveryPrice : undefined
        }

        logger.debug(`Mapped database PriceInformationModel with id=${dbModel.id} to PriceInformationUpdateOutputDto`)

        return data
    }
}