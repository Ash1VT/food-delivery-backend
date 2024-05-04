import { ModeratorCreateInputDto, ModeratorCreateOutputDto, ModeratorGetOutputDto } from "../../dto/moderator.dto";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator.models";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../interfaces/moderator.mappers";

export class ModeratorGetMapper implements IModeratorGetMapper {

    toDto(dbModel: ModeratorModel): ModeratorGetOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }

}

export class ModeratorCreateMapper implements IModeratorCreateMapper {

    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }

    toDbModel(dtoModel: ModeratorCreateInputDto): ModeratorCreateInput {
        return {
            id: dtoModel.id
        }
    }

}