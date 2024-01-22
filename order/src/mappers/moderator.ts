import { ModeratorCreateInputDTO, ModeratorCreateOutputDTO, ModeratorGetOutputDTO } from "../dto/moderator";
import { ModeratorModel } from "../models/moderator";
import { IModeratorGetMapper, IModeratorCreateMapper } from "./interfaces/instances/moderator";

export class ModeratorGetMapper implements IModeratorGetMapper {

    toDto(dbModel: ModeratorModel): ModeratorGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: ModeratorModel[]): ModeratorGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class ModeratorCreateMapper implements IModeratorCreateMapper {

    toDto(dbModel: ModeratorModel): ModeratorCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: ModeratorModel[]): ModeratorCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: ModeratorCreateInputDTO): ModeratorModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dtoModels: ModeratorCreateInputDTO[]): ModeratorModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): ModeratorCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
