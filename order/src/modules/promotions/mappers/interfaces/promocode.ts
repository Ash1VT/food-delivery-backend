import { PromocodeCreateOutputDTO, PromocodeCreateInputDTO, PromocodeGetOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel } from "../../models/promocode";
import { PromocodeCreateDtoModelAdditionalData, PromocodeCreateDbModelAdditionalData, PromocodeGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IPromocodeCreateMapper extends IDatabaseToDtoMapper<PromocodeModel, PromocodeCreateOutputDTO, PromocodeCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<PromocodeCreateInputDTO, PromocodeCreateInput, PromocodeCreateDbModelAdditionalData> {}

export interface IPromocodeGetMapper extends IDatabaseToDtoMapper<PromocodeModel, PromocodeGetOutputDTO, PromocodeGetDtoModelAdditionalData> {}