import { PromotionGetOutputDto, PromotionCreateOutputDto, PromotionCreateInputDto } from "../../dto/promotion.dto";
import { PromotionModel } from "../../models/promotion.models";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../interfaces/promotion.mappers";

export class PromotionGetMapper implements IPromotionGetMapper {

    toDto(dbModel: PromotionModel): PromotionGetOutputDto {
        return {
            ...dbModel
        }
    }

}

export class PromotionCreateMapper implements IPromotionCreateMapper {

    toDto(dbModel: PromotionModel): PromotionCreateOutputDto {
        return {
            ...dbModel
        }
    }
    
    toDbModel(dtoModel: PromotionCreateInputDto): PromotionModel {
        return {
            ...dtoModel
        }
    }

}
