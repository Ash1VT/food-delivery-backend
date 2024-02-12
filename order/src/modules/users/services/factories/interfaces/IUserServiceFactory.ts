import ICourierService from "../../interfaces/ICourierService";
import ICustomerService from "../../interfaces/ICustomerService";
import IModeratorService from "../../interfaces/IModeratorService";
import IRestaurantManagerService from "../../interfaces/IRestaurantManagerService";

export default interface IUserServiceFactory {
    createCustomerService(): ICustomerService
    createCourierService(): ICourierService
    createRestaurantManager(): IRestaurantManagerService
    createModeratorService(): IModeratorService
}