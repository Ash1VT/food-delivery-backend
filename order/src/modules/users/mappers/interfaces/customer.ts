import { CustomerCreateOutputDTO, CustomerCreateInputDTO, CustomerGetOutputDTO } from "../../dto/customer";
import { CustomerCreateInput, CustomerModel } from "../../models/customer";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { CustomerCreateDtoModelAdditionalData, CustomerCreateDbModelAdditionalData, CustomerGetDtoModelAdditionalData } from "../additionalData";


export interface ICustomerCreateMapper extends IDatabaseToDtoMapper<CustomerModel, CustomerCreateOutputDTO, CustomerCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<CustomerCreateInputDTO, CustomerCreateInput, CustomerCreateDbModelAdditionalData> {}


export interface ICustomerGetMapper extends IDatabaseToDtoMapper<CustomerModel, CustomerGetOutputDTO, CustomerGetDtoModelAdditionalData> {}