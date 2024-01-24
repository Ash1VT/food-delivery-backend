import { RestaurantCreateOutputDTO, RestaurantCreateInputDTO, RestaurantGetOutputDTO } from "../../dto/restaurant";
import { RestaurantCreateInput, RestaurantModel } from "../../models/restaurant";
import { RestaurantCreateDtoModelAdditionalData, RestaurantCreateDbModelAdditionalData, RestaurantGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IRestaurantCreateMapper extends IDatabaseToDtoMapper<RestaurantModel, RestaurantCreateOutputDTO, RestaurantCreateDtoModelAdditionalData>,
                                                 IDtoToDatabaseMapper<RestaurantCreateInputDTO, RestaurantCreateInput, RestaurantCreateDbModelAdditionalData> 
                                                 {}

export interface IRestaurantGetMapper extends IDatabaseToDtoMapper<RestaurantModel, RestaurantGetOutputDTO, RestaurantGetDtoModelAdditionalData> {}