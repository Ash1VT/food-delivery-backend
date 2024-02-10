import { RestaurantManagerGetOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerCreateOutputDto } from "../../dto/restaurantManager.dto";

export default interface IRestaurantManagerService {
    create(restaurantManagerData: RestaurantManagerCreateInputDto): Promise<RestaurantManagerCreateOutputDto>
}