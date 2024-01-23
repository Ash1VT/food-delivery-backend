import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../models/courier";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { CourierCreateDtoModelAdditionalData, CourierCreateDbModelAdditionalData, CourierGetDtoModelAdditionalData } from "../additionalData";

export interface ICourierCreateMapper extends IDatabaseToDtoMapper<CourierModel, CourierCreateOutputDTO, CourierCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<CourierCreateInputDTO, CourierCreateInput, CourierCreateDbModelAdditionalData> {}


export interface ICourierGetMapper extends IDatabaseToDtoMapper<CourierModel, CourierGetOutputDTO, CourierGetDtoModelAdditionalData> {}