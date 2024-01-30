import { ModeratorCreateInputDTO, ModeratorCreateOutputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../interfaces/moderator";

export class ModeratorGetMapper implements IModeratorGetMapper {

    toDto(dbModel: ModeratorModel): ModeratorGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

}

export class ModeratorCreateMapper implements IModeratorCreateMapper {

    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDbModel(dtoModel: ModeratorCreateInputDTO): ModeratorCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }

}