import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../interfaces/restaurantManager";
import { RestaurantManagerGetDtoModelAdditionalData, RestaurantManagerCreateDtoModelAdditionalData, RestaurantManagerCreateDbModelAdditionalData } from "../additionalData";
import mapManyModels from "@/utils/mapManyModels";

export class RestaurantManagerGetMapper implements IRestaurantManagerGetMapper {

    toDto(dbModel: RestaurantManagerModel, additionalData: RestaurantManagerGetDtoModelAdditionalData): RestaurantManagerGetOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: RestaurantManagerModel[], additionalData: RestaurantManagerGetDtoModelAdditionalData[]): RestaurantManagerGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class RestaurantManagerCreateMapper implements IRestaurantManagerCreateMapper {

    toDto(dbModel: RestaurantManagerModel, additionalData: RestaurantManagerCreateDtoModelAdditionalData): RestaurantManagerCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: RestaurantManagerModel[], additionalData: RestaurantManagerCreateDtoModelAdditionalData[]): RestaurantManagerCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: RestaurantManagerCreateInputDTO, additionalData: RestaurantManagerCreateDbModelAdditionalData): RestaurantManagerCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }

    toDbModels(dtoModels: RestaurantManagerCreateInputDTO[], additionalData: RestaurantManagerCreateDbModelAdditionalData[]): RestaurantManagerCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }
}
