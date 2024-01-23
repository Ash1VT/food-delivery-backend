import { CustomerCreateInput, CustomerModel } from "../../models/customer";
import { CustomerGetOutputDTO, CustomerCreateOutputDTO, CustomerCreateInputDTO } from "../../dto/customer";
import { ICustomerCreateMapper, ICustomerGetMapper } from "../interfaces/customer";
import { CustomerGetDtoModelAdditionalData, CustomerCreateDtoModelAdditionalData, CustomerCreateDbModelAdditionalData } from "../additionalData";
import mapManyModels from "@/utils/mapManyModels";

export class CustomerGetMapper implements ICustomerGetMapper {

    toDto(dbModel: CustomerModel, additionalData: CustomerGetDtoModelAdditionalData): CustomerGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: CustomerModel[], additionalData: CustomerGetDtoModelAdditionalData[]): CustomerGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class CustomerCreateMapper implements ICustomerCreateMapper {

    toDto(dbModel: CustomerModel, additionalData: CustomerCreateDtoModelAdditionalData): CustomerCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: CustomerModel[], additionalData: CustomerCreateDtoModelAdditionalData[]): CustomerCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }   

    toDbModel(dtoModel: CustomerCreateInputDTO, additionalData: CustomerCreateDbModelAdditionalData): CustomerCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }
    
    toDbModels(dtoModels: CustomerCreateInputDTO[], additionalData: CustomerCreateDbModelAdditionalData[]): CustomerCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }
}

