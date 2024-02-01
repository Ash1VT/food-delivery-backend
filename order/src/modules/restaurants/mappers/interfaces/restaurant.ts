import { RestaurantCreateInputDTO, RestaurantCreateOutputDTO, RestaurantGetOutputDTO } from "../../dto/restaurant";
import { RestaurantCreateInput, RestaurantModel } from "../../models/restaurant";

export interface IRestaurantGetMapper {
    toDto(dbModel: RestaurantModel): RestaurantGetOutputDTO
}

export interface IRestaurantCreateMapper {
    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDTO
    toDbModel(dtoModel: RestaurantCreateInputDTO): RestaurantCreateInput
}