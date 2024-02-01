import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";
import { CourierCreateInput, CourierModel } from "../../models/courier";
import { ICourierCreateMapper, ICourierGetMapper } from "../interfaces/courier";

export class CourierGetMapper implements ICourierGetMapper {

    toDto(dbModel: CourierModel): CourierGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

}

export class CourierCreateMapper implements ICourierCreateMapper {

    toDto(dbModel: CourierModel): CourierCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }
    
    toDbModel(dtoModel: CourierCreateInputDTO): CourierCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }

}