import { RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerGetOutputDTO } from "../../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../../models/restaurantManager";
import { RestaurantCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IRestaurantManagerCreateMapper extends DatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerCreateOutputDTO>,
                                              DtoToDatabaseMapper<RestaurantManagerCreateInputDTO, RestaurantManagerCreateInput, RestaurantCreateAdditionalData>,
                                              IObjectToDtoMapper<RestaurantManagerCreateInputDTO> {}


export interface IRestaurantManagerGetMapper extends DatabaseToDtoMapper<RestaurantManagerModel, RestaurantManagerGetOutputDTO> {}