import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "../../models/restaurant";
import IBaseRepository from "./IBaseRepository";

export default interface IRestaurantRepository
                         extends IBaseRepository<RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput> {

}