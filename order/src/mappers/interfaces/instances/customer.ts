import { CustomerCreateOutputDTO, CustomerCreateInputDTO, CustomerGetOutputDTO } from "../../../dto/customer";
import { CustomerCreateInput, CustomerModel } from "../../../models/customer";
import { CustomerCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface ICustomerCreateMapper extends DatabaseToDtoMapper<CustomerModel, CustomerCreateOutputDTO>,
                                              DtoToDatabaseMapper<CustomerCreateInputDTO, CustomerCreateInput, CustomerCreateAdditionalData>,
                                              IObjectToDtoMapper<CustomerCreateInputDTO> {}


export interface ICustomerGetMapper extends DatabaseToDtoMapper<CustomerModel, CustomerGetOutputDTO> {}