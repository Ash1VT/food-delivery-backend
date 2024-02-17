import { RestaurantGetOutputDto, RestaurantCreateOutputDto, RestaurantCreateInputDto } from "../../dto/restaurant.dto";
import { RestaurantModel } from "../../models/restaurant.models";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "../interfaces/restaurant.mappers";

export class RestaurantGetMapper implements IRestaurantGetMapper {

    toDto(dbModel: RestaurantModel): RestaurantGetOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }

}

export class RestaurantCreateMapper implements IRestaurantCreateMapper {

    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }
    
    toDbModel(dtoModel: RestaurantCreateInputDto): RestaurantModel {
        return {
            id: dtoModel.id
        }
    }

}