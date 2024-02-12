import { IRestaurantGetMapper, IRestaurantCreateMapper } from "../../interfaces/restaurant.mappers";

export default interface IRestaurantMapperFactory {
    createRestaurantGetMapper(): IRestaurantGetMapper;
    createRestaurantCreateMapper(): IRestaurantCreateMapper;
}