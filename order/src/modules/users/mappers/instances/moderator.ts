import { ModeratorCreateInputDTO, ModeratorCreateOutputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../interfaces/moderator";

export class ModeratorGetMapper implements IModeratorGetMapper {

    toDto(dbModel: ModeratorModel): ModeratorGetOutputDTO {
        return {
            ...dbModel
        }
    }

}

export class ModeratorCreateMapper implements IModeratorCreateMapper {

    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDTO {
        return {
            ...dbModel
        }
    }

    toDbModel(dtoModel: ModeratorCreateInputDTO): ModeratorCreateInput {
        return {
            ...dtoModel
        }
    }

}