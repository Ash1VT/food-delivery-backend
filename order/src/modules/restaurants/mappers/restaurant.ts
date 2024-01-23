import { RestaurantGetOutputDTO, RestaurantCreateOutputDTO, RestaurantCreateInputDTO } from "../dto/restaurant";
import { RestaurantModel } from "../models/restaurant";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "./interfaces/restaurant";
import { RestaurantGetDtoModelAdditionalData, RestaurantCreateDtoModelAdditionalData, RestaurantCreateDbModelAdditionalData } from "./additionalData";
import mapManyModels from "../../../utils/mapManyModels";

export class RestaurantGetMapper implements IRestaurantGetMapper {

    toDto(dbModel: RestaurantModel, additionalData: RestaurantGetDtoModelAdditionalData): RestaurantGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: RestaurantModel[], additionalData: RestaurantGetDtoModelAdditionalData[]): RestaurantGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class RestaurantCreateMapper implements IRestaurantCreateMapper {

    toDto(dbModel: RestaurantModel, additionalData: RestaurantCreateDtoModelAdditionalData): RestaurantCreateOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }
    
    toDtos(dbModels: RestaurantModel[], additionalData: RestaurantCreateDtoModelAdditionalData[]): RestaurantCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: RestaurantCreateInputDTO, additionalData: RestaurantCreateDbModelAdditionalData): RestaurantModel {
        return {
            id: BigInt(dtoModel.id)
        }
    }

    toDbModels(dtoModels: RestaurantCreateInputDTO[], additionalData: RestaurantCreateDbModelAdditionalData[]): RestaurantModel[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}
