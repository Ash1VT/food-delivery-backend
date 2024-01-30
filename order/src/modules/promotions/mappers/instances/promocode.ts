import { PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeGetOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../interfaces/promocode";

export class PromocodeGetMapper implements IPromocodeGetMapper {

    toDto(dbModel: PromocodeModel): PromocodeGetOutputDTO {
        return {
            id: Number(dbModel.id),
            nameIdentifier: dbModel.nameIdentifier,
            discountPercentage: dbModel.discountPercentage,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
            maxUsageCount: dbModel.maxUsageCount,
            currentUsageCount: dbModel.currentUsageCount,
            restaurantId: Number(dbModel.restaurantId),
            isActive: dbModel.isActive
        }
    }

}

export class PromocodeCreateMapper implements IPromocodeCreateMapper {
    
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            nameIdentifier: dbModel.nameIdentifier,
            discountPercentage: dbModel.discountPercentage,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
            maxUsageCount: dbModel.maxUsageCount,
            currentUsageCount: dbModel.currentUsageCount,
            restaurantId: Number(dbModel.restaurantId),
            isActive: dbModel.isActive
        }
    }

    toDbModel(dtoModel: PromocodeCreateInputDTO): PromocodeCreateInput {
        return {
            nameIdentifier: dtoModel.nameIdentifier,
            discountPercentage: dtoModel.discountPercentage,
            validFrom: new Date(dtoModel.validFrom),
            validUntil: new Date(dtoModel.validUntil),
            maxUsageCount: dtoModel.maxUsageCount,
            restaurantId: BigInt(dtoModel.restaurantId)
        }
    }

}

export class PromocodeUpdateMapper implements IPromocodeUpdateMapper {

    toDto(dbModel: PromocodeModel): PromocodeUpdateOutputDTO {
        return {
            id: Number(dbModel.id),
            nameIdentifier: dbModel.nameIdentifier,
            discountPercentage: dbModel.discountPercentage,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
            maxUsageCount: dbModel.maxUsageCount,
            currentUsageCount: dbModel.currentUsageCount,
            restaurantId: Number(dbModel.restaurantId),
            isActive: dbModel.isActive
        }
    }
    
    toDbModel(dtoModel: PromocodeUpdateInputDTO): PromocodeUpdateInput {
        return {
            discountPercentage: dtoModel.discountPercentage,
            validFrom: new Date(dtoModel.validFrom),
            validUntil: new Date(dtoModel.validUntil),
            maxUsageCount: dtoModel.maxUsageCount,
        }
    }
    
}