import { RestaurantGetOutputDTO, RestaurantCreateOutputDTO, RestaurantCreateInputDTO } from "../dto/restaurant";
import { RestaurantModel } from "../models/restaurant";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "./interfaces/instances/restaurant";

export class RestaurantGetMapper implements IRestaurantGetMapper {

    toDto(dbModel: RestaurantModel): RestaurantGetOutputDTO {
        return {
            id: Number(dbModel.id)
        }
    }

    toDtos(dbModels: RestaurantModel[]): RestaurantGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class RestaurantCreateMapper implements IRestaurantCreateMapper {

    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDTO {
        throw new Error("Method not implemented.");
    }
    
    toDtos(dbModels: RestaurantModel[]): RestaurantCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: RestaurantCreateInputDTO): RestaurantModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dtoModels: RestaurantCreateInputDTO[]): RestaurantModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): RestaurantCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
