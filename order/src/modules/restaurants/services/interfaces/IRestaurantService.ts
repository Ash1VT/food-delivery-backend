import { RestaurantGetOutputDto, RestaurantCreateInputDto, RestaurantCreateOutputDto } from "../../dto/restaurant.dto";

export default interface IRestaurantService {
    create(restaurantData: RestaurantCreateInputDto): Promise<RestaurantCreateOutputDto>
}