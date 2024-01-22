import { RestaurantCreateOutputDTO, RestaurantCreateInputDTO, RestaurantGetOutputDTO } from "../../../dto/restaurant";
import { RestaurantCreateInput, RestaurantModel } from "../../../models/restaurant";
import { RestaurantCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IRestaurantCreateMapper extends DatabaseToDtoMapper<RestaurantModel, RestaurantCreateOutputDTO>,
                                              DtoToDatabaseMapper<RestaurantCreateInputDTO, RestaurantCreateInput, RestaurantCreateAdditionalData>,
                                              IObjectToDtoMapper<RestaurantCreateInputDTO> {}

export interface IRestaurantGetMapper extends DatabaseToDtoMapper<RestaurantModel, RestaurantGetOutputDTO> {}