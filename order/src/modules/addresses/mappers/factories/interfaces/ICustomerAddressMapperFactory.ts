import { ICustomerAddressCreateMapper, ICustomerAddressGetMapper, ICustomerAddressUpdateMapper } from "@src/modules/addresses/mappers/interfaces/customerAddress.mappers";

export interface ICustomerAddressMapperFactory {
    createCustomerAddressGetMapper(): ICustomerAddressGetMapper
    createCustomerAddressCreateMapper(): ICustomerAddressCreateMapper
    createCustomerAddressUpdateMapper(): ICustomerAddressUpdateMapper
}