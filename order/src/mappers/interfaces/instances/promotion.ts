import { PromotionCreateOutputDTO, PromotionCreateInputDTO, PromotionGetOutputDTO } from "../../../dto/promotion";
import { PromotionCreateInput, PromotionModel } from "../../../models/promotion";
import { PromocodeCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IPromotionCreateMapper extends DatabaseToDtoMapper<PromotionModel, PromotionCreateOutputDTO>,
                                              DtoToDatabaseMapper<PromotionCreateInputDTO, PromotionCreateInput, PromocodeCreateAdditionalData>,
                                              IObjectToDtoMapper<PromotionCreateInputDTO> {}

export interface IPromotionGetMapper extends DatabaseToDtoMapper<PromotionModel, PromotionGetOutputDTO> {}