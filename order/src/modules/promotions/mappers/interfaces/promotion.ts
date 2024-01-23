import { PromotionCreateOutputDTO, PromotionCreateInputDTO, PromotionGetOutputDTO } from "../../dto/promotion";
import { PromotionCreateInput, PromotionModel } from "../../models/promotion";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { PromotionCreateDtoModelAdditionalData, PromotionCreateDbModelAdditionalData, PromotionGetDtoModelAdditionalData } from "../additionalData";


export interface IPromotionCreateMapper extends IDatabaseToDtoMapper<PromotionModel, PromotionCreateOutputDTO, PromotionCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<PromotionCreateInputDTO, PromotionCreateInput, PromotionCreateDbModelAdditionalData> {}

export interface IPromotionGetMapper extends IDatabaseToDtoMapper<PromotionModel, PromotionGetOutputDTO, PromotionGetDtoModelAdditionalData> {}