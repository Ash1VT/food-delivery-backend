import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../models/courier";
import { ICourierCreateMapper, ICourierGetMapper } from "../interfaces/courier";

export class CourierGetMapper implements ICourierGetMapper {

    toDto(dbModel: CourierModel): CourierGetOutputDTO {
        return {
            ...dbModel
        }
    }

}

export class CourierCreateMapper implements ICourierCreateMapper {

    toDto(dbModel: CourierModel): CourierCreateOutputDTO {
        return {
            ...dbModel
        }
    }
    
    toDbModel(dtoModel: CourierCreateInputDTO): CourierCreateInput {
        return {
            ...dtoModel
        }
    }

}