import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateOutputDTO, RestaurantManagerCreateInputDTO } from "../dto/restaurantManager";
import { RestaurantManagerModel } from "../models/restaurantManager";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "./interfaces/instances/restaurantManager";

export class RestaurantManagerGetMapper implements IRestaurantManagerGetMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerGetOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: RestaurantManagerModel[]): RestaurantManagerGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class RestaurantManagerCreateMapper implements IRestaurantManagerCreateMapper {

    toDto(dbModel: RestaurantManagerModel): RestaurantManagerCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: RestaurantManagerModel[]): RestaurantManagerCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: RestaurantManagerCreateInputDTO): RestaurantManagerModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dtoModels: RestaurantManagerCreateInputDTO[]): RestaurantManagerModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): RestaurantManagerCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
