import getLogger from "@src/core/setup/logger";
import { CustomerAddressGetOutputDto } from "../../dto/customerAddresses.dto";
import { CustomerAddressCreateOutputDto, CustomerAddressCreateInputDto } from "../../dto/customerAddresses.dto";
import { CustomerAddressModel, CustomerAddressCreateInput } from "../../models/customerAddress.models";
import { CustomerAddressAdditionalData } from "../additionalData";
import { ICustomerAddressCreateMapper, ICustomerAddressGetMapper } from "../interfaces/customerAddress.mappers";

const logger = getLogger(module)

export class CustomerAddressGetMapper implements ICustomerAddressGetMapper {

    toDto(dbModel: CustomerAddressModel): CustomerAddressGetOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId?.toString()
        }

        logger.debug(`Mapped database CustomerAddressModel with id=${dbModel.id} to CustomerAddressGetOutputDto`)

        return data
    }

}

export class CustomerAddressCreateMapper implements ICustomerAddressCreateMapper {

    toDto(dbModel: CustomerAddressModel): CustomerAddressCreateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId?.toString()
        }

        logger.debug(`Mapped database CustomerAddressModel with id=${dbModel.id} to CustomerAddressCreateOutputDto`)
        
        return data
    }
    
    toDbModel(dtoModel: CustomerAddressCreateInputDto, additionalData: CustomerAddressAdditionalData): CustomerAddressCreateInput {
        const data = {
            ...dtoModel,
            customerId: additionalData.customerId
        }

        logger.debug(`Mapped CustomerAddressCreateInputDto to database CustomerAddressCreateInput`)

        return data
    }

}