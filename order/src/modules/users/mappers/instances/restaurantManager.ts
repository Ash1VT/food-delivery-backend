import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../interfaces/restaurantManager";

export class RestaurantManagerGetMapper implements IRestaurantManagerGetMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDTO {
        return {
            id: dbModel.id,
            restaurantId: dbModel.restaurantId ? dbModel.restaurantId : undefined
        }
    }

}

export class RestaurantManagerCreateMapper implements IRestaurantManagerCreateMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDTO {
        return {
            id: dbModel.id
        }
    }

    toDbModel(dtoModel: RestaurantManagerCreateInputDTO): RestaurantManagerCreateInput {
        return {
            id: dtoModel.id
        }
    }

}
