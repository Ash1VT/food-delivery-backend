import { PromotionGetOutputDto, PromotionCreateOutputDto, PromotionCreateInputDto } from "../../dto/promotion.dto";
import { PromotionCreateInput, PromotionModel } from "../../models/promotion.models";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../interfaces/promotion.mappers";

export class PromotionGetMapper implements IPromotionGetMapper {

    toDto(dbModel: PromotionModel): PromotionGetOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }

}

export class PromotionCreateMapper implements IPromotionCreateMapper {

    toDto(dbModel: PromotionModel): PromotionCreateOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }
    
    toDbModel(dtoModel: PromotionCreateInputDto): PromotionCreateInput {
        return {
            ...dtoModel
        }
    }

}
