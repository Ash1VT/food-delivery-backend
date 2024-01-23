import { PromocodeCreateOutputDTO, PromocodeCreateInputDTO, PromocodeGetOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel } from "../../models/promocode";
import { PromocodeCreateDbModelAdditionalData, PromocodeCreateDtoModelAdditionalData, PromocodeGetDtoModelAdditionalData } from "../../../../mappers/types/additionalData";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";


export interface IPromocodeCreateMapper extends DatabaseToDtoMapper<PromocodeModel, PromocodeCreateOutputDTO, PromocodeCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<PromocodeCreateInputDTO, PromocodeCreateInput, PromocodeCreateDbModelAdditionalData> {}

export interface IPromocodeGetMapper extends DatabaseToDtoMapper<PromocodeModel, PromocodeGetOutputDTO, PromocodeGetDtoModelAdditionalData> {}