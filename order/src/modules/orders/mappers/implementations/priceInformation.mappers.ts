import { PriceInformationCreateOutputDto, PriceInformationGetOutputDto, PriceInformationUpdateOutputDto } from "../../dto/priceInformation.dto";
import { PriceInformationModel } from "../../models/priceInformation.models";
import { IPriceInformationCreateMapper, IPriceInformationGetMapper, IPriceInformationUpdateMapper } from "../interfaces/priceInformation.mappers";

export class PriceInformationGetMapper implements IPriceInformationGetMapper {

    toDto(dbModel: PriceInformationModel): PriceInformationGetOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            deliveryPrice: dbModel.deliveryPrice ? dbModel.deliveryPrice : undefined
        }
    }

}

export class PriceInformationCreateMapper implements IPriceInformationCreateMapper {

    toDto(dbModel: PriceInformationModel): PriceInformationCreateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            deliveryPrice: dbModel.deliveryPrice ? dbModel.deliveryPrice : undefined
        }
    }
    
}

export class PriceInformationUpdateMapper implements IPriceInformationUpdateMapper {

    toDto(dbModel: PriceInformationModel): PriceInformationUpdateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            deliveryPrice: dbModel.deliveryPrice ? dbModel.deliveryPrice : undefined
        }
    }
}