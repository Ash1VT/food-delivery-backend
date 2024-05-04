import { RestaurantManagerCreateOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerGetOutputDto, RestaurantManagerUpdateOutputDto, RestaurantManagerUpdateInputDto } from "../../dto/restaurantManager.dto";
import { RestaurantManagerCreateInput, RestaurantManagerModel, RestaurantManagerUpdateInput } from "../../models/restaurantManager.models";

export interface IRestaurantManagerGetMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDto
}

export interface IRestaurantManagerCreateMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDto
    toDbModel(dtoModel: RestaurantManagerCreateInputDto): RestaurantManagerCreateInput
}

export interface IRestaurantManagerUpdateMapper {
    toDto(dbModel: RestaurantManagerModel): RestaurantManagerUpdateOutputDto
    toDbModel(dtoModel: RestaurantManagerUpdateInputDto): RestaurantManagerUpdateInput
}