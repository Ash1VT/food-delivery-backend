import { CourierModel } from "@src/modules/users/models/courier.models";
import { CustomerModel } from "@src/modules/users/models/customer.models";
import { ModeratorModel } from "@src/modules/users/models/moderator.models";
import { RestaurantManagerModel } from "@src/modules/users/models/restaurantManager.models";

export default interface IBaseService {
    customer?: CustomerModel
    courier?: CourierModel
    restaurantManager?: RestaurantManagerModel
    moderator?: ModeratorModel
}