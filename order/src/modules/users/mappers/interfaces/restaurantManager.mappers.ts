import { RestaurantManagerCreateOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerGetOutputDto } from "../../dto/restaurantManager.dto";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager.models";

export interface IRestaurantManagerGetMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDto
}

export interface IRestaurantManagerCreateMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDto
    toDbModel(dtoModel: RestaurantManagerCreateInputDto): RestaurantManagerCreateInput
}