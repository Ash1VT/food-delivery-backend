import { CustomerCreateInput, CustomerModel } from "../../models/customer";
import { CustomerGetOutputDTO, CustomerCreateOutputDTO, CustomerCreateInputDTO } from "../../dto/customer";
import { ICustomerCreateMapper, ICustomerGetMapper } from "../interfaces/customer";

export class CustomerGetMapper implements ICustomerGetMapper {

    toDto(dbModel: CustomerModel): CustomerGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

}

export class CustomerCreateMapper implements ICustomerCreateMapper {

    toDto(dbModel: CustomerModel): CustomerCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }


    toDbModel(dtoModel: CustomerCreateInputDTO): CustomerCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }
    
}

