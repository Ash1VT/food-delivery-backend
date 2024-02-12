import { CustomerCreateOutputDto, CustomerCreateInputDto, CustomerGetOutputDto } from "../../dto/customer.dto";
import { CustomerCreateInput, CustomerModel } from "../../models/customer.models";

export interface ICustomerGetMapper {
    toDto(dbModel: CustomerModel): CustomerGetOutputDto
}

export interface ICustomerCreateMapper {
    toDto(dbModel: CustomerModel): CustomerCreateOutputDto
    toDbModel(dtoModel: CustomerCreateInputDto): CustomerCreateInput
}