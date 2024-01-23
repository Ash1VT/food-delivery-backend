import { CustomerCreateOutputDTO, CustomerCreateInputDTO, CustomerGetOutputDTO } from "../../dto/customer";
import { CustomerCreateInput, CustomerModel } from "../../models/customer";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { CustomerCreateDtoModelAdditionalData, CustomerCreateDbModelAdditionalData, CustomerGetDtoModelAdditionalData } from "../additionalData";


export interface ICustomerCreateMapper extends DatabaseToDtoMapper<CustomerModel, CustomerCreateOutputDTO, CustomerCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<CustomerCreateInputDTO, CustomerCreateInput, CustomerCreateDbModelAdditionalData> {}


export interface ICustomerGetMapper extends DatabaseToDtoMapper<CustomerModel, CustomerGetOutputDTO, CustomerGetDtoModelAdditionalData> {}