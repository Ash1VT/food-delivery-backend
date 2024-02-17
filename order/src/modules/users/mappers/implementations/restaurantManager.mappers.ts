import { RestaurantManagerGetOutputDto, RestaurantManagerCreateOutputDto, RestaurantManagerCreateInputDto } from "../../dto/restaurantManager.dto";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager.models";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../interfaces/restaurantManager.mappers";

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
