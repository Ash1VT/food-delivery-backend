import IBaseService from "@src/core/services/IBaseService";
import { RestaurantGetOutputDto, RestaurantCreateInputDto, RestaurantCreateOutputDto, RestaurantUpdateInputDto, RestaurantUpdateOutputDto } from "../../dto/restaurant.dto";

export default interface IRestaurantService extends IBaseService {
    create(restaurantData: RestaurantCreateInputDto): Promise<RestaurantCreateOutputDto>
    update(restaurantId: bigint, restaurantData: RestaurantUpdateInputDto): Promise<RestaurantUpdateOutputDto>
}