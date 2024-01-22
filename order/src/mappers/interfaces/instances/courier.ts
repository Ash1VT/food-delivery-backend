import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../../models/courier";
import { CourierCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";

export interface ICourierCreateMapper extends DatabaseToDtoMapper<CourierModel, CourierCreateOutputDTO>,
                                              DtoToDatabaseMapper<CourierCreateInputDTO, CourierCreateInput, CourierCreateAdditionalData>,
                                              IObjectToDtoMapper<CourierCreateInputDTO> {}


export interface ICourierGetMapper extends DatabaseToDtoMapper<CourierModel, CourierGetOutputDTO> {}