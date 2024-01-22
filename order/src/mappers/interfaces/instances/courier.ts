import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../../models/courier";
import { CourierCreateDbModelAdditionalData, CourierCreateDtoModelAdditionalData, CourierGetDtoModelAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";

export interface ICourierCreateMapper extends DatabaseToDtoMapper<CourierModel, CourierCreateOutputDTO, CourierCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<CourierCreateInputDTO, CourierCreateInput, CourierCreateDbModelAdditionalData> {}


export interface ICourierGetMapper extends DatabaseToDtoMapper<CourierModel, CourierGetOutputDTO, CourierGetDtoModelAdditionalData> {}