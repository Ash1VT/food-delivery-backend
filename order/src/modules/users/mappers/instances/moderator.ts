import { ModeratorCreateInputDTO, ModeratorCreateOutputDTO, ModeratorGetOutputDTO } from "../../dto/moderator";
import { ModeratorCreateInput, ModeratorModel } from "../../models/moderator";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../interfaces/moderator";
import { ModeratorGetDtoModelAdditionalData, ModeratorCreateDtoModelAdditionalData, ModeratorCreateDbModelAdditionalData } from "../additionalData";
import mapManyModels from "@src/utils/mapManyModels";

export class ModeratorGetMapper implements IModeratorGetMapper {

    toDto(dbModel: ModeratorModel, additionalData: ModeratorGetDtoModelAdditionalData): ModeratorGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: ModeratorModel[], additionalData: ModeratorGetDtoModelAdditionalData[]): ModeratorGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class ModeratorCreateMapper implements IModeratorCreateMapper {

    toDto(dbModel: ModeratorModel, additionalData: ModeratorCreateDtoModelAdditionalData): ModeratorCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: ModeratorModel[], additionalData: ModeratorCreateDtoModelAdditionalData[]): ModeratorCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: ModeratorCreateInputDTO, additionalData: ModeratorCreateDbModelAdditionalData = {}): ModeratorCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }

    toDbModels(dtoModels: ModeratorCreateInputDTO[], additionalData: ModeratorCreateDbModelAdditionalData[] = []): ModeratorCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}