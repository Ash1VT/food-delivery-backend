import { RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerGetOutputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { RestaurantManagerCreateDbModelAdditionalData, RestaurantManagerCreateDtoModelAdditionalData, RestaurantManagerGetDtoModelAdditionalData } from "../additionalData";


export interface IRestaurantManagerCreateMapper extends DatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<RestaurantManagerCreateInputDTO, RestaurantManagerCreateInput, RestaurantManagerCreateDbModelAdditionalData>
                                                {}


export interface IRestaurantManagerGetMapper extends DatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerGetOutputDTO, RestaurantManagerGetDtoModelAdditionalData> {}