import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../models/restaurantManager.models";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IRestaurantManagerRepository extends IBaseRepository<RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput> {}