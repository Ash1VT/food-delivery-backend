import { PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeGetOutputDTO } from "../dto/promocode";
import { PromocodeModel } from "../models/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper } from "./interfaces/instances/promocode";

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
            isActive: dbModel.isActive
        }
    }

    toDtos(dbModels: PromocodeModel[]): PromocodeGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class PromocodeCreateMapper implements IPromocodeCreateMapper {
    
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: PromocodeModel[]): PromocodeCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }
    
    toDbModel(dtoModel: PromocodeCreateInputDTO): PromocodeModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dtoModels: PromocodeCreateInputDTO[]): PromocodeModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): PromocodeCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
