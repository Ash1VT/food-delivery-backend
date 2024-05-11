import { CustomerAddressCreateInputDto, CustomerAddressCreateOutputDto, CustomerAddressGetOutputDto } from "../../dto/customerAddresses.dto"
import { CustomerAddressCreateInput, CustomerAddressModel } from "../../models/customerAddress.models"
import { CustomerAddressAdditionalData } from "../additionalData"

export interface ICustomerAddressGetMapper {
    toDto(dbModel: CustomerAddressModel): CustomerAddressGetOutputDto
}

export interface ICustomerAddressCreateMapper {
    toDto(dbModel: CustomerAddressModel): CustomerAddressCreateOutputDto
    toDbModel(dtoModel: CustomerAddressCreateInputDto, additionalData: CustomerAddressAdditionalData): CustomerAddressCreateInput
}
