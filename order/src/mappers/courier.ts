import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../dto/courier";
import { CourierCreateInput, CourierModel } from "../models/courier";
import { ICourierCreateMapper, ICourierGetMapper } from "./interfaces/instances/courier";

export class CourierGetMapper implements ICourierGetMapper {

    toDto(dbModel: CourierModel): CourierGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: CourierModel[]): CourierGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class CourierCreateMapper implements ICourierCreateMapper {

    toDto(dbModel: CourierModel): CourierCreateOutputDTO {
        throw new Error("Method not implemented.");
    }
    
    toDtos(dbModels: CourierModel[]): CourierCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: CourierCreateInputDTO): CourierCreateInput {
        throw new Error("Method not implemented.");
    }
    
    toDbModels(dtoModels: CourierCreateInputDTO[]): CourierCreateInput[] {
        throw new Error("Method not implemented.");
    }
    
    parse(data: any): CourierCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}