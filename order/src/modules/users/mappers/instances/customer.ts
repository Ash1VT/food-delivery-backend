import { CustomerCreateInput, CustomerModel } from "../../models/customer";
import { CustomerGetOutputDTO, CustomerCreateOutputDTO, CustomerCreateInputDTO } from "../../dto/customer";
import { ICustomerCreateMapper, ICustomerGetMapper } from "../interfaces/customer";

export class CustomerGetMapper implements ICustomerGetMapper {

    toDto(dbModel: CustomerModel): CustomerGetOutputDTO {
        return {
            ...dbModel
        }
    }

}

export class CustomerCreateMapper implements ICustomerCreateMapper {

    toDto(dbModel: CustomerModel): CustomerCreateOutputDTO {
        return {
            ...dbModel
        }
    }


    toDbModel(dtoModel: CustomerCreateInputDTO): CustomerCreateInput {
        return {
            ...dtoModel
        }
    }
    
}

