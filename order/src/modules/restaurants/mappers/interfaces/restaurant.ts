import { RestaurantCreateOutputDTO, RestaurantCreateInputDTO, RestaurantGetOutputDTO } from "../../dto/restaurant";
import { RestaurantCreateInput, RestaurantModel } from "../../models/restaurant";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { RestaurantCreateDtoModelAdditionalData, RestaurantCreateDbModelAdditionalData, RestaurantGetDtoModelAdditionalData } from "../additionalData";


export interface IRestaurantCreateMapper extends IDatabaseToDtoMapper<RestaurantModel, RestaurantCreateOutputDTO, RestaurantCreateDtoModelAdditionalData>,
                                                 IDtoToDatabaseMapper<RestaurantCreateInputDTO, RestaurantCreateInput, RestaurantCreateDbModelAdditionalData> 
                                                 {}

export interface IRestaurantGetMapper extends IDatabaseToDtoMapper<RestaurantModel, RestaurantGetOutputDTO, RestaurantGetDtoModelAdditionalData> {}