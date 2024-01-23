import { RestaurantCreateOutputDTO, RestaurantCreateInputDTO, RestaurantGetOutputDTO } from "../../dto/restaurant";
import { RestaurantCreateInput, RestaurantModel } from "../../models/restaurant";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { RestaurantCreateDtoModelAdditionalData, RestaurantCreateDbModelAdditionalData, RestaurantGetDtoModelAdditionalData } from "../additionalData";


export interface IRestaurantCreateMapper extends DatabaseToDtoMapper<RestaurantModel, RestaurantCreateOutputDTO, RestaurantCreateDtoModelAdditionalData>,
                                                 DtoToDatabaseMapper<RestaurantCreateInputDTO, RestaurantCreateInput, RestaurantCreateDbModelAdditionalData> 
                                                 {}

export interface IRestaurantGetMapper extends DatabaseToDtoMapper<RestaurantModel, RestaurantGetOutputDTO, RestaurantGetDtoModelAdditionalData> {}