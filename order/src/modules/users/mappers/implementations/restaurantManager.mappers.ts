import { RestaurantManagerGetOutputDto, RestaurantManagerCreateOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerUpdateOutputDto, RestaurantManagerUpdateInputDto } from "../../dto/restaurantManager.dto";
import { RestaurantManagerCreateInput, RestaurantManagerModel, RestaurantManagerUpdateInput } from "../../models/restaurantManager.models";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper, IRestaurantManagerUpdateMapper } from "../interfaces/restaurantManager.mappers";

export class RestaurantManagerGetMapper implements IRestaurantManagerGetMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDto {
        return {
            id: dbModel.id.toString(),
            restaurantId: dbModel.restaurantId ? dbModel.restaurantId.toString() : undefined
        }
    }

}

export class RestaurantManagerCreateMapper implements IRestaurantManagerCreateMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDto {
        return {
            id: dbModel.id.toString()
        }
    }

    toDbModel(dtoModel: RestaurantManagerCreateInputDto): RestaurantManagerCreateInput {
        return {
            id: dtoModel.id
        }
    }

}

export class RestaurantManagerUpdateMapper implements IRestaurantManagerUpdateMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerUpdateOutputDto {
        return {
            id: dbModel.id.toString(),
            restaurantId: dbModel.restaurantId?.toString()
        }
    }

    toDbModel(dtoModel: RestaurantManagerUpdateInputDto): RestaurantManagerUpdateInput {
        return {
            restaurantId: dtoModel.restaurantId
        }
    }

}
