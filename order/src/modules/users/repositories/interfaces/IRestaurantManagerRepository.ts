import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../models/restaurantManager";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IRestaurantManagerRepository extends IBaseRepository<RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput> {}