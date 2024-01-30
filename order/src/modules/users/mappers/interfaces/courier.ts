import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../models/courier";


export interface ICourierGetMapper {
    toDto(dbModel: CourierModel): CourierGetOutputDTO
}

export interface ICourierCreateMapper {
    toDto(dbModel: CourierModel): CourierCreateOutputDTO
    toDbModel(dtoModel: CourierCreateInputDTO): CourierCreateInput
}