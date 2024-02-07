import { PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeGetOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../interfaces/promocode";

export class PromocodeGetMapper implements IPromocodeGetMapper {

    toDto(dbModel: PromocodeModel): PromocodeGetOutputDTO {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toISOString(),
            validUntil: dbModel.validUntil.toISOString(),
        }
    }

}

export class PromocodeCreateMapper implements IPromocodeCreateMapper {
    
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDTO {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toISOString(),
            validUntil: dbModel.validUntil.toISOString(),
        }
    }

    toDbModel(dtoModel: PromocodeCreateInputDTO): PromocodeCreateInput {
        return {
            ...dtoModel,
        }
    }

}

export class PromocodeUpdateMapper implements IPromocodeUpdateMapper {

    toDto(dbModel: PromocodeModel): PromocodeUpdateOutputDTO {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toISOString(),
            validUntil: dbModel.validUntil.toISOString(),
        }
    }
    
    toDbModel(dtoModel: PromocodeUpdateInputDTO): PromocodeUpdateInput {
        return {
            ...dtoModel,
        }
    }
    
}