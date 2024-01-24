import { PromotionCreateOutputDTO, PromotionCreateInputDTO, PromotionGetOutputDTO } from "../../dto/promotion";
import { PromotionCreateInput, PromotionModel } from "../../models/promotion";
import { PromotionCreateDtoModelAdditionalData, PromotionCreateDbModelAdditionalData, PromotionGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IPromotionCreateMapper extends IDatabaseToDtoMapper<PromotionModel, PromotionCreateOutputDTO, PromotionCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<PromotionCreateInputDTO, PromotionCreateInput, PromotionCreateDbModelAdditionalData> {}

export interface IPromotionGetMapper extends IDatabaseToDtoMapper<PromotionModel, PromotionGetOutputDTO, PromotionGetDtoModelAdditionalData> {}