import { CourierCreateInputDto, CourierCreateOutputDto, CourierGetOutputDto } from "../../dto/courier.dto";
import { CourierCreateInput, CourierModel } from "../../models/courier.models";


export interface ICourierGetMapper {
    toDto(dbModel: CourierModel): CourierGetOutputDto
}

export interface ICourierCreateMapper {
    toDto(dbModel: CourierModel): CourierCreateOutputDto
    toDbModel(dtoModel: CourierCreateInputDto): CourierCreateInput
}