import { RestaurantGetOutputDto, RestaurantCreateOutputDto, RestaurantCreateInputDto } from "../../dto/restaurant.dto";
import { RestaurantModel } from "../../models/restaurant.models";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "../interfaces/restaurant.mappers";

export class RestaurantGetMapper implements IRestaurantGetMapper {

    toDto(dbModel: RestaurantModel): RestaurantGetOutputDto {
        return {
            ...dbModel
        }
    }

}

export class RestaurantCreateMapper implements IRestaurantCreateMapper {

    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDto {
        return {
            ...dbModel
        }
    }
    
    toDbModel(dtoModel: RestaurantCreateInputDto): RestaurantModel {
        return {
            ...dtoModel
        }
    }

}