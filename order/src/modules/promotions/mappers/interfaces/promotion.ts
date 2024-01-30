import { PromotionCreateOutputDTO, PromotionCreateInputDTO, PromotionGetOutputDTO } from "../../dto/promotion";
import { PromotionCreateInput, PromotionModel } from "../../models/promotion";

export interface IPromotionGetMapper {
    toDto(dbModel: PromotionModel): PromotionGetOutputDTO
}

export interface IPromotionCreateMapper {
    toDto(dbModel: PromotionModel): PromotionCreateOutputDTO
    toDbModel(dtoModel: PromotionCreateInputDTO): PromotionCreateInput
}