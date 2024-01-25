import { CustomerCreateOutputDTO, CustomerCreateInputDTO, CustomerGetOutputDTO } from "../../dto/customer";
import { CustomerCreateInput, CustomerModel } from "../../models/customer";
import { CustomerCreateDtoModelAdditionalData, CustomerCreateDbModelAdditionalData, CustomerGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface ICustomerCreateMapper extends IDatabaseToDtoMapper<CustomerModel, CustomerCreateOutputDTO, CustomerCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<CustomerCreateInputDTO, CustomerCreateInput, CustomerCreateDbModelAdditionalData> {}


export interface ICustomerGetMapper extends IDatabaseToDtoMapper<CustomerModel, CustomerGetOutputDTO, CustomerGetDtoModelAdditionalData> {}