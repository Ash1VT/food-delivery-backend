import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerCreateInput, RestaurantManagerModel } from "../../models/restaurantManager";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../interfaces/restaurantManager";

export class RestaurantManagerGetMapper implements IRestaurantManagerGetMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

}

export class RestaurantManagerCreateMapper implements IRestaurantManagerCreateMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDbModel(dtoModel: RestaurantManagerCreateInputDTO): RestaurantManagerCreateInput {
        return {
            id: BigInt(dtoModel.id)
        }
    }

}
