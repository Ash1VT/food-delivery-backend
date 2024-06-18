import { CustomerAddressCreateInputDto, CustomerAddressCreateOutputDto, CustomerAddressGetOutputDto, CustomerAddressUpdateInputDto, CustomerAddressUpdateOutputDto } from "../../dto/customerAddresses.dto"
import { CustomerAddressCreateInput, CustomerAddressModel, CustomerAddressUpdateInput } from "../../models/customerAddress.models"
import { CustomerAddressAdditionalData } from "../additionalData"

export interface ICustomerAddressGetMapper {
    toDto(dbModel: CustomerAddressModel): CustomerAddressGetOutputDto
}

export interface ICustomerAddressCreateMapper {
    toDto(dbModel: CustomerAddressModel): CustomerAddressCreateOutputDto
    toDbModel(dtoModel: CustomerAddressCreateInputDto, additionalData: CustomerAddressAdditionalData): CustomerAddressCreateInput
}

export interface ICustomerAddressUpdateMapper {
    toDbModel(dtoModel: CustomerAddressUpdateInputDto): CustomerAddressUpdateInput
    toDto(dbModel: CustomerAddressModel): CustomerAddressUpdateOutputDto
}