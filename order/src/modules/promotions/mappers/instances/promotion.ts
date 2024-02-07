import { PromotionGetOutputDTO, PromotionCreateOutputDTO, PromotionCreateInputDTO } from "../../dto/promotion";
import { PromotionModel } from "../../models/promotion";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../interfaces/promotion";

export class PromotionGetMapper implements IPromotionGetMapper {

    toDto(dbModel: PromotionModel): PromotionGetOutputDTO {
        return {
            ...dbModel
        }
    }

}

export class PromotionCreateMapper implements IPromotionCreateMapper {

    toDto(dbModel: PromotionModel): PromotionCreateOutputDTO {
        return {
            ...dbModel
        }
    }
    
    toDbModel(dtoModel: PromotionCreateInputDTO): PromotionModel {
        return {
            ...dtoModel
        }
    }

}
