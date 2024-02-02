import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "../../models/restaurant";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IRestaurantRepository extends IBaseRepository<RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput> {}