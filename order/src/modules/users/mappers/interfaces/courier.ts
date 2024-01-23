import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../models/courier";
import { CourierCreateDbModelAdditionalData, CourierCreateDtoModelAdditionalData, CourierGetDtoModelAdditionalData } from "../../../../mappers/types/additionalData";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";

export interface ICourierCreateMapper extends DatabaseToDtoMapper<CourierModel, CourierCreateOutputDTO, CourierCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<CourierCreateInputDTO, CourierCreateInput, CourierCreateDbModelAdditionalData> {}


export interface ICourierGetMapper extends DatabaseToDtoMapper<CourierModel, CourierGetOutputDTO, CourierGetDtoModelAdditionalData> {}