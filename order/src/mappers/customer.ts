import { CustomerCreateInput, CustomerModel } from "../models/customer";
import { CustomerGetOutputDTO, CustomerCreateOutputDTO, CustomerCreateInputDTO } from "../dto/customer";
import { ICustomerCreateMapper, ICustomerGetMapper } from "./interfaces/instances/customer";
import { CustomerCreateAdditionalData } from "./types/additionalData";

export class CustomerGetMapper implements ICustomerGetMapper {

    toDto(dbModel: CustomerModel): CustomerGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: CustomerModel[]): CustomerGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class CustomerCreateMapper implements ICustomerCreateMapper {

    toDto(dbModel: CustomerModel): CustomerCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: CustomerModel[]): CustomerCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: CustomerCreateInputDTO, additionalData: CustomerCreateAdditionalData): CustomerCreateInput {
        throw new Error("Method not implemented.");
    }
    
    toDbModels(dtoModels: CustomerCreateInputDTO[], additionalData: CustomerCreateAdditionalData[]): CustomerCreateInput[] {
        throw new Error("Method not implemented.");
    }


    parse(data: any): CustomerCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}

