import { ICustomerAddressGetMapper, ICustomerAddressCreateMapper } from "@src/modules/addresses/mappers/interfaces/customerAddress.mappers";
import { ICustomerAddressMapperFactory } from "../interfaces/ICustomerAddressMapperFactory";
import { CustomerAddressCreateMapper, CustomerAddressGetMapper } from "@src/modules/addresses/mappers/implementations/customerAddress.mappers";

export class CustomerAddressMapperFactory implements ICustomerAddressMapperFactory {

    public createCustomerAddressGetMapper(): ICustomerAddressGetMapper {
        return new CustomerAddressGetMapper()
    }

    public createCustomerAddressCreateMapper(): ICustomerAddressCreateMapper {
        return new CustomerAddressCreateMapper()
    }

}