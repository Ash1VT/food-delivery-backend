import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../dto/courier";
import { CourierCreateInput, CourierModel } from "../models/courier";
import { ICourierCreateMapper, ICourierGetMapper } from "./interfaces/instances/courier";
import { CourierCreateDbModelAdditionalData, CourierCreateDtoModelAdditionalData, CourierGetDtoModelAdditionalData } from "./types/additionalData";
import mapManyModels from "./utils";

export class CourierGetMapper implements ICourierGetMapper {

    toDto(dbModel: CourierModel, additionalData: CourierGetDtoModelAdditionalData): CourierGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: CourierModel[], additionalData: CourierGetDtoModelAdditionalData[]): CourierGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class CourierCreateMapper implements ICourierCreateMapper {

    toDto(dbModel: CourierModel, additionalData: CourierCreateDtoModelAdditionalData): CourierCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }
    
    toDtos(dbModels: CourierModel[], additionalData: CourierCreateDtoModelAdditionalData[]): CourierCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: CourierCreateInputDTO, additionalData: CourierCreateDbModelAdditionalData): CourierCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }
    
    toDbModels(dtoModels: CourierCreateInputDTO[], additionalData: CourierCreateDbModelAdditionalData[]): CourierCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)

    }

}