import { ICourierCreateMapper, ICourierGetMapper } from "../../interfaces/courier.mappers"
import { ICustomerCreateMapper, ICustomerGetMapper } from "../../interfaces/customer.mappers"
import { IModeratorCreateMapper, IModeratorGetMapper } from "../../interfaces/moderator.mappers"
import { IRestaurantManagerCreateMapper, IRestaurantManagerGetMapper } from "../../interfaces/restaurantManager.mappers"

export default interface IUserMapperFactory {
    createCustomerGetMapper(): ICustomerGetMapper
    createCustomerCreateMapper(): ICustomerCreateMapper
    createCourierGetMapper(): ICourierGetMapper
    createCourierCreateMapper(): ICourierCreateMapper
    createRestaurantManagerGetMapper(): IRestaurantManagerGetMapper
    createRestaurantManagerCreateMapper(): IRestaurantManagerCreateMapper
    createModeratorGetMapper(): IModeratorGetMapper
    createModeratorCreateMapper(): IModeratorCreateMapper
}