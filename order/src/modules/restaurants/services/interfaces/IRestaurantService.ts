import IBaseService from "@src/core/services/IBaseService";
import { RestaurantGetOutputDto, RestaurantCreateInputDto, RestaurantCreateOutputDto } from "../../dto/restaurant.dto";

export default interface IRestaurantService extends IBaseService {
    create(restaurantData: RestaurantCreateInputDto): Promise<RestaurantCreateOutputDto>
}