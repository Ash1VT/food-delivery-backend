import { PromotionGetOutputDTO, PromotionCreateOutputDTO, PromotionCreateInputDTO } from "../../dto/promotion";
import { PromotionModel } from "../../models/promotion";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../interfaces/promotion";

export class PromotionGetMapper implements IPromotionGetMapper {

    toDto(dbModel: PromotionModel): PromotionGetOutputDTO {
        return {
            id: Number(dbModel.id),
        }
    }

}

export class PromotionCreateMapper implements IPromotionCreateMapper {

    toDto(dbModel: PromotionModel): PromotionCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }
    
    toDbModel(dtoModel: PromotionCreateInputDTO): PromotionModel {
        return {
            id: BigInt(dtoModel.id)
        }
    }

}
