import { RestaurantGetMapper, RestaurantCreateMapper } from "../../implementations/restaurant.mappers";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "../../interfaces/restaurant.mappers";
import IRestaurantMapperFactory from "../interfaces/IRestaurantMapperFactory";

export default class RestaurantMapperFactory implements IRestaurantMapperFactory {
    public createRestaurantGetMapper(): IRestaurantGetMapper {
        return new RestaurantGetMapper()
    }

    public createRestaurantCreateMapper(): IRestaurantCreateMapper {
        return new RestaurantCreateMapper()
    }
}