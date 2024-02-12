import { RestaurantCreateInputDto, RestaurantCreateOutputDto, RestaurantGetOutputDto } from "../../dto/restaurant.dto";
import { RestaurantCreateInput, RestaurantModel } from "../../models/restaurant.models";

export interface IRestaurantGetMapper {
    toDto(dbModel: RestaurantModel): RestaurantGetOutputDto
}

export interface IRestaurantCreateMapper {
    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDto
    toDbModel(dtoModel: RestaurantCreateInputDto): RestaurantCreateInput
}