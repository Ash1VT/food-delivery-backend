import { PromocodeCreateOutputDTO, PromocodeCreateInputDTO, PromocodeGetOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import { PromocodeCreateDtoModelAdditionalData, PromocodeCreateDbModelAdditionalData, PromocodeGetDtoModelAdditionalData, PromocodeUpdateDbModelAdditionalData, PromocodeUpdateDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IPromocodeCreateMapper extends IDatabaseToDtoMapper<PromocodeModel, PromocodeCreateOutputDTO, PromocodeCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<PromocodeCreateInputDTO, PromocodeCreateInput, PromocodeCreateDbModelAdditionalData> {}

export interface IPromocodeUpdateMapper extends IDatabaseToDtoMapper<PromocodeModel, PromocodeUpdateOutputDTO, PromocodeUpdateDtoModelAdditionalData>,
                                                IDtoToDatabaseMapper<PromocodeUpdateInputDTO, PromocodeUpdateInput, PromocodeUpdateDbModelAdditionalData> {}

export interface IPromocodeGetMapper extends IDatabaseToDtoMapper<PromocodeModel, PromocodeGetOutputDTO, PromocodeGetDtoModelAdditionalData> {}