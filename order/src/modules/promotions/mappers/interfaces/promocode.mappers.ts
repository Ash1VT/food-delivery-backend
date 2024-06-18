import { PromocodeCreateOutputDto, PromocodeCreateInputDto, PromocodeGetOutputDto, PromocodeUpdateInputDto, PromocodeUpdateOutputDto } from "../../dto/promocode.dto";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode.models";

export interface IPromocodeGetMapper {
    toDto(dbModel: PromocodeModel): PromocodeGetOutputDto
}

export interface IPromocodeCreateMapper {
    toDto(dbModel: PromocodeModel): PromocodeCreateOutputDto
    toDbModel(dtoModel: PromocodeCreateInputDto): PromocodeCreateInput
}

export interface IPromocodeUpdateMapper {
    toDto(dbModel: PromocodeModel): PromocodeUpdateOutputDto
    toDbModel(dtoModel: PromocodeUpdateInputDto): PromocodeUpdateInput
}