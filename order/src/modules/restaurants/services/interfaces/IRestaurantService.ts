import { RestaurantGetOutputDTO, RestaurantCreateInputDTO, RestaurantCreateOutputDTO } from "../../dto/restaurant";

export default interface IRestaurantService {
    create(restaurantData: RestaurantCreateInputDTO): Promise<RestaurantCreateOutputDTO>
}