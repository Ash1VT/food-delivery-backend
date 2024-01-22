import { CustomerCreateOutputDTO, CustomerCreateInputDTO, CustomerGetOutputDTO } from "../../../dto/customer";
import { CustomerCreateInput, CustomerModel } from "../../../models/customer";
import { CustomerCreateDbModelAdditionalData, CustomerCreateDtoModelAdditionalData, CustomerGetDtoModelAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";


export interface ICustomerCreateMapper extends DatabaseToDtoMapper<CustomerModel, CustomerCreateOutputDTO, CustomerCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<CustomerCreateInputDTO, CustomerCreateInput, CustomerCreateDbModelAdditionalData> {}


export interface ICustomerGetMapper extends DatabaseToDtoMapper<CustomerModel, CustomerGetOutputDTO, CustomerGetDtoModelAdditionalData> {}