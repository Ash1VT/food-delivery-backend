import { PromotionCreateOutputDto, PromotionCreateInputDto, PromotionGetOutputDto } from "../../dto/promotion.dto";
import { PromotionCreateInput, PromotionModel } from "../../models/promotion.models";

export interface IPromotionGetMapper {
    toDto(dbModel: PromotionModel): PromotionGetOutputDto
}

export interface IPromotionCreateMapper {
    toDto(dbModel: PromotionModel): PromotionCreateOutputDto
    toDbModel(dtoModel: PromotionCreateInputDto): PromotionCreateInput
}