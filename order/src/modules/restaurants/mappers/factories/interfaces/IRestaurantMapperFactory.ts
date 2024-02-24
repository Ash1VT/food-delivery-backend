import { IRestaurantGetMapper, IRestaurantCreateMapper, IRestaurantUpdateMapper } from "../../interfaces/restaurant.mappers";

export default interface IRestaurantMapperFactory {
    createRestaurantGetMapper(): IRestaurantGetMapper;
    createRestaurantCreateMapper(): IRestaurantCreateMapper;
    createRestaurantUpdateMapper(): IRestaurantUpdateMapper;
}