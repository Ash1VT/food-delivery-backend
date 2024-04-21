import { RestaurantGetMapper, RestaurantCreateMapper, RestaurantUpdateMapper } from "../../implementations/restaurant.mappers";
import { IRestaurantGetMapper, IRestaurantCreateMapper, IRestaurantUpdateMapper } from "../../interfaces/restaurant.mappers";
import IRestaurantMapperFactory from "../interfaces/IRestaurantMapperFactory";

export default class RestaurantMapperFactory implements IRestaurantMapperFactory {

    public createRestaurantGetMapper(): IRestaurantGetMapper {
        return new RestaurantGetMapper()
    }

    public createRestaurantCreateMapper(): IRestaurantCreateMapper {
        return new RestaurantCreateMapper()
    }

    public createRestaurantUpdateMapper(): IRestaurantUpdateMapper {
        return new RestaurantUpdateMapper()
    }
}