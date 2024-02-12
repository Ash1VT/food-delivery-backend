import { CourierCreateInputDto, CourierCreateOutputDto, CourierGetOutputDto } from "../../dto/courier.dto";
import { CourierCreateInput, CourierModel } from "../../models/courier.models";
import { ICourierCreateMapper, ICourierGetMapper } from "../interfaces/courier.mappers";

export class CourierGetMapper implements ICourierGetMapper {

    toDto(dbModel: CourierModel): CourierGetOutputDto {
        return {
            ...dbModel
        }
    }

}

export class CourierCreateMapper implements ICourierCreateMapper {

    toDto(dbModel: CourierModel): CourierCreateOutputDto {
        return {
            ...dbModel
        }
    }
    
    toDbModel(dtoModel: CourierCreateInputDto): CourierCreateInput {
        return {
            ...dtoModel
        }
    }

}