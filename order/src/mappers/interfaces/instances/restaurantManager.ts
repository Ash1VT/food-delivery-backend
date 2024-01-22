import { RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerGetOutputDTO } from "../../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../../models/restaurantManager";
import { RestaurantCreateDbModelAdditionalData, RestaurantManagerCreateDtoModelAdditionalData, RestaurantManagerGetDtoModelAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";


export interface IRestaurantManagerCreateMapper extends DatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<RestaurantManagerCreateInputDTO, RestaurantManagerCreateInput, RestaurantCreateDbModelAdditionalData>
                                                {}


export interface IRestaurantManagerGetMapper extends DatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerGetOutputDTO, RestaurantManagerGetDtoModelAdditionalData> {}