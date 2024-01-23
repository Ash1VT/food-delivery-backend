import { PromotionCreateOutputDTO, PromotionCreateInputDTO, PromotionGetOutputDTO } from "../../dto/promotion";
import { PromotionCreateInput, PromotionModel } from "../../models/promotion";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { PromotionCreateDtoModelAdditionalData, PromotionCreateDbModelAdditionalData, PromotionGetDtoModelAdditionalData } from "../additionalData";


export interface IPromotionCreateMapper extends DatabaseToDtoMapper<PromotionModel, PromotionCreateOutputDTO, PromotionCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<PromotionCreateInputDTO, PromotionCreateInput, PromotionCreateDbModelAdditionalData> {}

export interface IPromotionGetMapper extends DatabaseToDtoMapper<PromotionModel, PromotionGetOutputDTO, PromotionGetDtoModelAdditionalData> {}