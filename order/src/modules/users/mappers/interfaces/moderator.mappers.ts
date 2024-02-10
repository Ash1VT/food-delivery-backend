import { ModeratorCreateOutputDto, ModeratorCreateInputDto, ModeratorGetOutputDto } from "../../dto/moderator.dto";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator.models";

export interface IModeratorGetMapper {
    toDto(dbModel: ModeratorModel): ModeratorGetOutputDto
}

export interface IModeratorCreateMapper {
    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDto
    toDbModel(dtoModel: ModeratorCreateInputDto): ModeratorCreateInput
}