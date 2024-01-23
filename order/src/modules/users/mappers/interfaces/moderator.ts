import { ModeratorCreateOutputDTO, ModeratorCreateInputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";
import { ModeratorCreateDbModelAdditionalData, ModeratorCreateDtoModelAdditionalData, ModeratorGetDtoModelAdditionalData } from "../../../../mappers/types/additionalData";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";


export interface IModeratorCreateMapper extends DatabaseToDtoMapper<ModeratorModel, ModeratorCreateOutputDTO, ModeratorCreateDtoModelAdditionalData>,
                                                DtoToDatabaseMapper<ModeratorCreateInputDTO, ModeratorCreateInput, ModeratorCreateDbModelAdditionalData> {}


export interface IModeratorGetMapper extends DatabaseToDtoMapper<ModeratorModel, ModeratorGetOutputDTO, ModeratorGetDtoModelAdditionalData> {}