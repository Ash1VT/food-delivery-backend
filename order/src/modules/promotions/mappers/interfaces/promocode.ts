import { PromocodeCreateOutputDTO, PromocodeCreateInputDTO, PromocodeGetOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";

export interface IPromocodeGetMapper {
    toDto(dbModel: PromocodeModel): PromocodeGetOutputDTO
}

export interface IPromocodeCreateMapper {
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDTO
    toDbModel(dtoModel: PromocodeCreateInputDTO): PromocodeCreateInput
}

export interface IPromocodeUpdateMapper {
    toDto(dbModel: PromocodeModel): PromocodeUpdateOutputDTO
    toDbModel(dtoModel: PromocodeUpdateInputDTO): PromocodeUpdateInput
}