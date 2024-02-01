import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerCreateOutputDTO } from "../../dto/restaurantManager";

export default interface IRestaurantManagerService {
    create(restaurantManagerData: RestaurantManagerCreateInputDTO): Promise<RestaurantManagerCreateOutputDTO>
}