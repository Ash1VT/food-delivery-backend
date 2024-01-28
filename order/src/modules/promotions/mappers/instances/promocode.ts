import { PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeGetOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../interfaces/promocode";
import { PromocodeGetDtoModelAdditionalData, PromocodeCreateDtoModelAdditionalData, PromocodeCreateDbModelAdditionalData, PromocodeUpdateDbModelAdditionalData, PromocodeUpdateDtoModelAdditionalData } from "../additionalData";
import mapManyModels from "@src/utils/mapManyModels";

export class PromocodeGetMapper implements IPromocodeGetMapper {

    toDto(dbModel: PromocodeModel, additionalData: PromocodeGetDtoModelAdditionalData): PromocodeGetOutputDTO {
        return {
            id: Number(dbModel.id),
            nameIdentifier: dbModel.nameIdentifier,
            discountPercentage: dbModel.discountPercentage,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
            maxUsageCount: dbModel.maxUsageCount,
            currentUsageCount: dbModel.currentUsageCount,
            isActive: dbModel.isActive
        }
    }

    toDtos(dbModels: PromocodeModel[], additionalData: PromocodeGetDtoModelAdditionalData[]): PromocodeGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class PromocodeCreateMapper implements IPromocodeCreateMapper {
    
    toDto(dbModel: PromocodeModel, additionalData: PromocodeCreateDtoModelAdditionalData): PromocodeCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            nameIdentifier: dbModel.nameIdentifier,
            discountPercentage: dbModel.discountPercentage,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
            maxUsageCount: dbModel.maxUsageCount,
            currentUsageCount: dbModel.currentUsageCount,
            isActive: dbModel.isActive
        }
    }

    toDtos(dbModels: PromocodeModel[], additionalData: PromocodeCreateDtoModelAdditionalData[]): PromocodeCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }
    
    toDbModel(dtoModel: PromocodeCreateInputDTO, additionalData: PromocodeCreateDbModelAdditionalData = {}): PromocodeCreateInput {
        return {
            nameIdentifier: dtoModel.nameIdentifier,
            discountPercentage: dtoModel.discountPercentage,
            validFrom: new Date(dtoModel.validFrom),
            validUntil: new Date(dtoModel.validUntil),
            maxUsageCount: dtoModel.maxUsageCount,
        }
    }

    toDbModels(dtoModels: PromocodeCreateInputDTO[], additionalData: PromocodeCreateDbModelAdditionalData[] = []): PromocodeCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}

export class PromocodeUpdateMapper implements IPromocodeUpdateMapper {

    toDto(dbModel: PromocodeModel, additionalData: PromocodeUpdateDtoModelAdditionalData): PromocodeUpdateOutputDTO {
        return {
            id: Number(dbModel.id),
            nameIdentifier: dbModel.nameIdentifier,
            discountPercentage: dbModel.discountPercentage,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
            maxUsageCount: dbModel.maxUsageCount,
            currentUsageCount: dbModel.currentUsageCount,
            isActive: dbModel.isActive
        }
    }
    
    toDtos(dbModels: PromocodeModel[], additionalData: PromocodeUpdateDtoModelAdditionalData[]): PromocodeUpdateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }
    
    toDbModel(dtoModel: PromocodeUpdateInputDTO, additionalData: PromocodeUpdateDbModelAdditionalData): PromocodeUpdateInput {
        return {
            discountPercentage: dtoModel.discountPercentage,
            validFrom: new Date(dtoModel.validFrom),
            validUntil: new Date(dtoModel.validUntil),
            maxUsageCount: dtoModel.maxUsageCount,
        }
    }
    
    toDbModels(dtoModels: PromocodeUpdateInputDTO[], additionalData: PromocodeUpdateDbModelAdditionalData[]): PromocodeUpdateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}
