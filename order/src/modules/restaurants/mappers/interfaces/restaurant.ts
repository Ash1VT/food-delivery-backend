import { RestaurantCreateOutputDTO, RestaurantCreateInputDTO, RestaurantGetOutputDTO } from "../../dto/restaurant";
import { RestaurantCreateInput, RestaurantModel } from "../../models/restaurant";
import { RestaurantCreateDbModelAdditionalData, RestaurantCreateDtoModelAdditionalData, RestaurantGetDtoModelAdditionalData } from "../../../../mappers/types/additionalData";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";


export interface IRestaurantCreateMapper extends DatabaseToDtoMapper<RestaurantModel, RestaurantCreateOutputDTO, RestaurantCreateDtoModelAdditionalData>,
                                                 DtoToDatabaseMapper<RestaurantCreateInputDTO, RestaurantCreateInput, RestaurantCreateDbModelAdditionalData> 
                                                 {}

export interface IRestaurantGetMapper extends DatabaseToDtoMapper<RestaurantModel, RestaurantGetOutputDTO, RestaurantGetDtoModelAdditionalData> {}