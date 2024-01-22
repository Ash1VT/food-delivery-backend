import { PromotionGetOutputDTO, PromotionCreateOutputDTO, PromotionCreateInputDTO } from "../dto/promotion";
import { PromotionModel } from "../models/promotion";
import { IPromotionGetMapper, IPromotionCreateMapper } from "./interfaces/instances/promotion";

export class PromotionGetMapper implements IPromotionGetMapper {

    toDto(dbModel: PromotionModel): PromotionGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: PromotionModel[]): PromotionGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class PromotionCreateMapper implements IPromotionCreateMapper {

    toDto(dbModel: PromotionModel): PromotionCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: PromotionModel[]): PromotionCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }
    
    toDbModel(dtoModel: PromotionCreateInputDTO): PromotionModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dtoModels: PromotionCreateInputDTO[]): PromotionModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): PromotionCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
