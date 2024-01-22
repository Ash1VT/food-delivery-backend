import { PromocodeCreateOutputDTO, PromocodeCreateInputDTO, PromocodeGetOutputDTO } from "../../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel } from "../../../models/promocode";
import { PromocodeCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IPromocodeCreateMapper extends DatabaseToDtoMapper<PromocodeModel, PromocodeCreateOutputDTO>,
                                              DtoToDatabaseMapper<PromocodeCreateInputDTO, PromocodeCreateInput, PromocodeCreateAdditionalData>,
                                              IObjectToDtoMapper<PromocodeCreateInputDTO> {}

export interface IPromocodeGetMapper extends DatabaseToDtoMapper<PromocodeModel, PromocodeGetOutputDTO> {}