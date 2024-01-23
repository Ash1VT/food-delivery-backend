import { RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerGetOutputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { RestaurantManagerCreateDbModelAdditionalData, RestaurantManagerCreateDtoModelAdditionalData, RestaurantManagerGetDtoModelAdditionalData } from "../additionalData";


export interface IRestaurantManagerCreateMapper extends IDatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<RestaurantManagerCreateInputDTO, RestaurantManagerCreateInput, RestaurantManagerCreateDbModelAdditionalData>
                                                {}


export interface IRestaurantManagerGetMapper extends IDatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerGetOutputDTO, RestaurantManagerGetDtoModelAdditionalData> {}