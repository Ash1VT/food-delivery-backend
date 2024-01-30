import { ModeratorCreateOutputDTO, ModeratorCreateInputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";

export interface IModeratorGetMapper {
    toDto(dbModel: ModeratorModel): ModeratorGetOutputDTO
}

export interface IModeratorCreateMapper {
    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDTO
    toDbModel(dtoModel: ModeratorCreateInputDTO): ModeratorCreateInput
}