import { PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeGetOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../interfaces/promocode";

export class PromocodeGetMapper implements IPromocodeGetMapper {

    toDto(dbModel: PromocodeModel): PromocodeGetOutputDTO {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
        }
    }

}

export class PromocodeCreateMapper implements IPromocodeCreateMapper {
    
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDTO {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
        }
    }

    toDbModel(dtoModel: PromocodeCreateInputDTO): PromocodeCreateInput {
        return {
            ...dtoModel,
            validFrom: new Date(dtoModel.validFrom),
            validUntil: new Date(dtoModel.validUntil),
        }
    }

}

export class PromocodeUpdateMapper implements IPromocodeUpdateMapper {

    toDto(dbModel: PromocodeModel): PromocodeUpdateOutputDTO {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toString(),
            validUntil: dbModel.validUntil.toString(),
        }
    }
    
    toDbModel(dtoModel: PromocodeUpdateInputDTO): PromocodeUpdateInput {
        return {
            ...dtoModel,
            validFrom: new Date(dtoModel.validFrom),
            validUntil: new Date(dtoModel.validUntil),
        }
    }
    
}