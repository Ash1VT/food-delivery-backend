import { RestaurantGetOutputDto, RestaurantCreateOutputDto, RestaurantCreateInputDto, RestaurantUpdateOutputDto, RestaurantUpdateInputDto } from "../../dto/restaurant.dto";
import { RestaurantCreateInput, RestaurantModel, RestaurantUpdateInput } from "../../models/restaurant.models";
import { IRestaurantGetMapper, IRestaurantCreateMapper, IRestaurantUpdateMapper } from "../interfaces/restaurant.mappers";

export class RestaurantGetMapper implements IRestaurantGetMapper {

    toDto(dbModel: RestaurantModel): RestaurantGetOutputDto {
        return {
            id: dbModel.id.toString(),
            isActive: dbModel.isActive
        }
    }

}

export class RestaurantCreateMapper implements IRestaurantCreateMapper {

    toDto(dbModel: RestaurantModel): RestaurantCreateOutputDto {
        return {
            id: dbModel.id.toString(),
            isActive: dbModel.isActive
        }
    }
    
    toDbModel(dtoModel: RestaurantCreateInputDto): RestaurantCreateInput {
        return {
            id: dtoModel.id,
            isActive: dtoModel.isActive
        }
    }

}

export class RestaurantUpdateMapper implements IRestaurantUpdateMapper {

    toDto(dbModel: RestaurantModel): RestaurantUpdateOutputDto {
        return {
            id: dbModel.id.toString(),
            isActive: dbModel.isActive
        }
    }
    
    toDbModel(dtoModel: RestaurantUpdateInputDto): RestaurantUpdateInput {
        return {
            isActive: dtoModel.isActive
        }
    }

}