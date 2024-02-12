import { CourierCreateMapper, CourierGetMapper } from "../../implementations/courier.mappers";
import { CustomerCreateMapper, CustomerGetMapper } from "../../implementations/customer.mappers";
import { ICourierGetMapper, ICourierCreateMapper } from "../../interfaces/courier.mappers";
import { ICustomerGetMapper, ICustomerCreateMapper } from "../../interfaces/customer.mappers";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../../interfaces/moderator.mappers";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../../interfaces/restaurantManager.mappers";
import IUserMapperFactory from "../interfaces/IUserMapperFactory";
import { RestaurantManagerCreateMapper, RestaurantManagerGetMapper } from "../../implementations/restaurantManager.mappers";
import { ModeratorCreateMapper, ModeratorGetMapper } from "../../implementations/moderator.mappers";

export default class UserMapperFactory implements IUserMapperFactory {

    createCustomerGetMapper(): ICustomerGetMapper {
        return new CustomerGetMapper();
    }

    createCustomerCreateMapper(): ICustomerCreateMapper {
        return new CustomerCreateMapper();
    }

    createCourierGetMapper(): ICourierGetMapper {
        return new CourierGetMapper()
    }

    createCourierCreateMapper(): ICourierCreateMapper {
        return new CourierCreateMapper()
    }

    createRestaurantManagerGetMapper(): IRestaurantManagerGetMapper {
        return new RestaurantManagerGetMapper()
    }

    createRestaurantManagerCreateMapper(): IRestaurantManagerCreateMapper {
        return new RestaurantManagerCreateMapper()
    }

    createModeratorGetMapper(): IModeratorGetMapper {
        return new ModeratorGetMapper()
    }

    createModeratorCreateMapper(): IModeratorCreateMapper {
        return new ModeratorCreateMapper()
    }
}