import { ModeratorCreateOutputDTO, ModeratorCreateInputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";
import { ModeratorCreateDtoModelAdditionalData, ModeratorCreateDbModelAdditionalData, ModeratorGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IModeratorCreateMapper extends IDatabaseToDtoMapper<ModeratorModel, ModeratorCreateOutputDTO, ModeratorCreateDtoModelAdditionalData>,
                                                IDtoToDatabaseMapper<ModeratorCreateInputDTO, ModeratorCreateInput, ModeratorCreateDbModelAdditionalData> {}


export interface IModeratorGetMapper extends IDatabaseToDtoMapper<ModeratorModel, ModeratorGetOutputDTO, ModeratorGetDtoModelAdditionalData> {}