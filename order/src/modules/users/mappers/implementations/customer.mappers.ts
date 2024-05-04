import { CustomerCreateInput, CustomerModel } from "../../models/customer.models";
import { CustomerGetOutputDto, CustomerCreateOutputDto, CustomerCreateInputDto } from "../../dto/customer.dto";
import { ICustomerCreateMapper, ICustomerGetMapper } from "../interfaces/customer.mappers";

export class CustomerGetMapper implements ICustomerGetMapper {

    toDto(dbModel: CustomerModel): CustomerGetOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }

}

export class CustomerCreateMapper implements ICustomerCreateMapper {

    toDto(dbModel: CustomerModel): CustomerCreateOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }


    toDbModel(dtoModel: CustomerCreateInputDto): CustomerCreateInput {
        return {
            id: dtoModel.id
        }
    }
    
}

