import { ModeratorCreateOutputDTO, ModeratorCreateInputDTO, ModeratorGetOutputDTO } from "../../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../../models/moderator";
import { ModeratorCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IModeratorCreateMapper extends DatabaseToDtoMapper<ModeratorModel, ModeratorCreateOutputDTO>,
                                                DtoToDatabaseMapper<ModeratorCreateInputDTO, ModeratorCreateInput, ModeratorCreateAdditionalData>,
                                                IObjectToDtoMapper<ModeratorCreateInputDTO> {}


export interface IModeratorGetMapper extends DatabaseToDtoMapper<ModeratorModel, ModeratorGetOutputDTO> {}