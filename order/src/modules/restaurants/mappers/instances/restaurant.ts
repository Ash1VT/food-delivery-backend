import { RestaurantGetOutputDTO, RestaurantCreateOutputDTO, RestaurantCreateInputDTO } from "../../dto/restaurant";
import { RestaurantModel } from "../../models/restaurant";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "../interfaces/restaurant";

export class RestaurantGetMapper implements IRestaurantGetMapper {

    toDto(dbModel: RestaurantModel): RestaurantGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

}

export class RestaurantCreateMapper implements IRestaurantCreateMapper {

    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }
    
    toDbModel(dtoModel: RestaurantCreateInputDTO): RestaurantModel {
        return {
            id: BigInt(dtoModel.id)
        }
    }

}