import { PromotionGetOutputDTO, PromotionCreateOutputDTO, PromotionCreateInputDTO } from "../../dto/promotion";
import { PromotionModel } from "../../models/promotion";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../interfaces/promotion";
import { PromotionGetDtoModelAdditionalData, PromotionCreateDtoModelAdditionalData, PromotionCreateDbModelAdditionalData } from "../additionalData";
import mapManyModels from "../../../../utils/mapManyModels";

export class PromotionGetMapper implements IPromotionGetMapper {

    toDto(dbModel: PromotionModel, additionalData: PromotionGetDtoModelAdditionalData): PromotionGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: PromotionModel[], additionalData: PromotionGetDtoModelAdditionalData[]): PromotionGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class PromotionCreateMapper implements IPromotionCreateMapper {

    toDto(dbModel: PromotionModel, additionalData: PromotionCreateDtoModelAdditionalData): PromotionCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: PromotionModel[], additionalData: PromotionCreateDtoModelAdditionalData[]): PromotionCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }
    
    toDbModel(dtoModel: PromotionCreateInputDTO, additionalData: PromotionCreateDbModelAdditionalData): PromotionModel {
        return {
            id: BigInt(dtoModel.id)
        }
    }

    toDbModels(dtoModels: PromotionCreateInputDTO[], additionalData: PromotionCreateDbModelAdditionalData[]): PromotionModel[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}
