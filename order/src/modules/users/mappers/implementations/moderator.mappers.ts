import { ModeratorCreateInputDto, ModeratorCreateOutputDto, ModeratorGetOutputDto } from "../../dto/moderator.dto";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator.models";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../interfaces/moderator.mappers";

export class ModeratorGetMapper implements IModeratorGetMapper {

    toDto(dbModel: ModeratorModel): ModeratorGetOutputDto {
        return {
            ...dbModel
        }
    }

}

export class ModeratorCreateMapper implements IModeratorCreateMapper {

    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDto {
        return {
            ...dbModel
        }
    }

    toDbModel(dtoModel: ModeratorCreateInputDto): ModeratorCreateInput {
        return {
            ...dtoModel
        }
    }

}