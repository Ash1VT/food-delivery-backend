import { ModeratorCreateOutputDTO, ModeratorCreateInputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { ModeratorCreateDtoModelAdditionalData, ModeratorCreateDbModelAdditionalData, ModeratorGetDtoModelAdditionalData } from "../additionalData";


export interface IModeratorCreateMapper extends DatabaseToDtoMapper<ModeratorModel, ModeratorCreateOutputDTO, ModeratorCreateDtoModelAdditionalData>,
                                                DtoToDatabaseMapper<ModeratorCreateInputDTO, ModeratorCreateInput, ModeratorCreateDbModelAdditionalData> {}


export interface IModeratorGetMapper extends DatabaseToDtoMapper<ModeratorModel, ModeratorGetOutputDTO, ModeratorGetDtoModelAdditionalData> {}