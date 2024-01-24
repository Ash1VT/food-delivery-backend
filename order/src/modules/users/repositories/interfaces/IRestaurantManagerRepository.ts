import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../models/restaurantManager";
import IBaseRepository from "@src/base/repositories/interfaces/IBaseRepository";

export default interface IRestaurantManagerRepository
                         extends IBaseRepository<RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput> {

}