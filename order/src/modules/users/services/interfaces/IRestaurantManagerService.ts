import IBaseService from "@src/core/services/IBaseService";
import { RestaurantManagerGetOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerCreateOutputDto, RestaurantManagerUpdateInputDto, RestaurantManagerUpdateOutputDto } from "../../dto/restaurantManager.dto";

export default interface IRestaurantManagerService extends IBaseService {
    create(restaurantManagerData: RestaurantManagerCreateInputDto): Promise<RestaurantManagerCreateOutputDto>
    update(restaurantManagerId: bigint, restaurantManagerData: RestaurantManagerUpdateInputDto): Promise<RestaurantManagerUpdateOutputDto>
}