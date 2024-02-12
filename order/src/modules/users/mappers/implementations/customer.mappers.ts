import { CustomerCreateInput, CustomerModel } from "../../models/customer.models";
import { CustomerGetOutputDto, CustomerCreateOutputDto, CustomerCreateInputDto } from "../../dto/customer.dto";
import { ICustomerCreateMapper, ICustomerGetMapper } from "../interfaces/customer.mappers";

export class CustomerGetMapper implements ICustomerGetMapper {

    toDto(dbModel: CustomerModel): CustomerGetOutputDto {
        return {
            ...dbModel
        }
    }

}

export class CustomerCreateMapper implements ICustomerCreateMapper {

    toDto(dbModel: CustomerModel): CustomerCreateOutputDto {
        return {
            ...dbModel
        }
    }


    toDbModel(dtoModel: CustomerCreateInputDto): CustomerCreateInput {
        return {
            ...dtoModel
        }
    }
    
}

