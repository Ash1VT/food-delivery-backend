import { PromocodeCreateInputDto, PromocodeCreateOutputDto, PromocodeGetOutputDto, PromocodeUpdateInputDto, PromocodeUpdateOutputDto } from "../../dto/promocode.dto";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode.models";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../interfaces/promocode.mappers";

export class PromocodeGetMapper implements IPromocodeGetMapper {

    toDto(dbModel: PromocodeModel): PromocodeGetOutputDto {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toISOString(),
            validUntil: dbModel.validUntil.toISOString(),
        }
    }

}

export class PromocodeCreateMapper implements IPromocodeCreateMapper {
    
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDto {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toISOString(),
            validUntil: dbModel.validUntil.toISOString(),
        }
    }

    toDbModel(dtoModel: PromocodeCreateInputDto): PromocodeCreateInput {
        return {
            ...dtoModel,
        }
    }

}

export class PromocodeUpdateMapper implements IPromocodeUpdateMapper {

    toDto(dbModel: PromocodeModel): PromocodeUpdateOutputDto {
        return {
            ...dbModel,
            validFrom: dbModel.validFrom.toISOString(),
            validUntil: dbModel.validUntil.toISOString(),
        }
    }
    
    toDbModel(dtoModel: PromocodeUpdateInputDto): PromocodeUpdateInput {
        return {
            ...dtoModel,
        }
    }
    
}