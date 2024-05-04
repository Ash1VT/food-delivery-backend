import ICourierRepository from "../../interfaces/ICourierRepository";
import ICustomerRepository from "../../interfaces/ICustomerRepository";
import IModeratorRepository from "../../interfaces/IModeratorRepository";
import IRestaurantManagerRepository from "../../interfaces/IRestaurantManagerRepository";

export default interface IUserRepositoryFactory {
    createCustomerRepository(): ICustomerRepository
    createCourierRepository(): ICourierRepository
    createRestaurantManagerRepository(): IRestaurantManagerRepository
    createModeratorRepository(): IModeratorRepository
}