import { RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerGetOutputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager";

export interface IRestaurantManagerGetMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDTO
}

export interface IRestaurantManagerCreateMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDTO
    toDbModel(dtoModel: RestaurantManagerCreateInputDTO): RestaurantManagerCreateInput
}