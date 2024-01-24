import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../models/courier";
import { CourierCreateDtoModelAdditionalData, CourierCreateDbModelAdditionalData, CourierGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface ICourierCreateMapper extends IDatabaseToDtoMapper<CourierModel, CourierCreateOutputDTO, CourierCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<CourierCreateInputDTO, CourierCreateInput, CourierCreateDbModelAdditionalData> {}


export interface ICourierGetMapper extends IDatabaseToDtoMapper<CourierModel, CourierGetOutputDTO, CourierGetDtoModelAdditionalData> {}