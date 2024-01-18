import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../models/restaurantManager";
import IBaseRepository from "./IBaseRepository";

export default interface IRestaurantManagerRepository
                         extends IBaseRepository<RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput> {

}