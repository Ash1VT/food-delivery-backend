import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "../../models/restaurant";
import IBaseRepository from "@/base/repositories/interfaces/IBaseRepository";

export default interface IRestaurantRepository
                         extends IBaseRepository<RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput> {

}