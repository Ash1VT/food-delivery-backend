import { RestaurantCreateInputDto, RestaurantCreateOutputDto, RestaurantGetOutputDto, RestaurantUpdateInputDto, RestaurantUpdateOutputDto } from "../../dto/restaurant.dto";
import { RestaurantCreateInput, RestaurantModel, RestaurantUpdateInput } from "../../models/restaurant.models";

export interface IRestaurantGetMapper {
    toDto(dbModel: RestaurantModel): RestaurantGetOutputDto
}

export interface IRestaurantCreateMapper {
    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDto
    toDbModel(dtoModel: RestaurantCreateInputDto): RestaurantCreateInput
}

export interface IRestaurantUpdateMapper {
    toDto(dbModel: RestaurantModel): RestaurantUpdateOutputDto
    toDbModel(dtoModel: RestaurantUpdateInputDto): RestaurantUpdateInput
}