import IBaseService from "@src/core/services/IBaseService";
import { RestaurantManagerGetOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerCreateOutputDto } from "../../dto/restaurantManager.dto";

export default interface IRestaurantManagerService extends IBaseService {
    create(restaurantManagerData: RestaurantManagerCreateInputDto): Promise<RestaurantManagerCreateOutputDto>
}