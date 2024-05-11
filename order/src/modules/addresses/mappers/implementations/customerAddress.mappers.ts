import { CustomerAddressGetOutputDto } from "../../dto/customerAddresses.dto";
import { CustomerAddressCreateOutputDto, CustomerAddressCreateInputDto } from "../../dto/customerAddresses.dto";
import { CustomerAddressModel, CustomerAddressCreateInput } from "../../models/customerAddress.models";
import { CustomerAddressAdditionalData } from "../additionalData";
import { ICustomerAddressCreateMapper, ICustomerAddressGetMapper } from "../interfaces/customerAddress.mappers";

export class CustomerAddressGetMapper implements ICustomerAddressGetMapper {

    toDto(dbModel: CustomerAddressModel): CustomerAddressGetOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId?.toString()
        }
    }

}

export class CustomerAddressCreateMapper implements ICustomerAddressCreateMapper {

    toDto(dbModel: CustomerAddressModel): CustomerAddressCreateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId?.toString()
        }
    }
    
    toDbModel(dtoModel: CustomerAddressCreateInputDto, additionalData: CustomerAddressAdditionalData): CustomerAddressCreateInput {
        return {
            ...dtoModel,
            customerId: additionalData.customerId
        }
    }

}