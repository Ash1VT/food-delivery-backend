import { CustomerCreateOutputDTO, CustomerCreateInputDTO, CustomerGetOutputDTO } from "../../dto/customer";
import { CustomerCreateInput, CustomerModel } from "../../models/customer";

export interface ICustomerGetMapper {
    toDto(dbModel: CustomerModel): CustomerGetOutputDTO
}

export interface ICustomerCreateMapper {
    toDto(dbModel: CustomerModel): CustomerCreateOutputDTO
    toDbModel(dtoModel: CustomerCreateInputDTO): CustomerCreateInput
}