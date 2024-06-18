import IRestaurantRepository from "../../interfaces/IRestaurantRepository";
import IWorkingHoursRepository from "../../interfaces/IWorkingHoursRepository";

export default interface IRestaurantRepositoryFactory {
    createRestaurantRepository(): IRestaurantRepository
    createWorkingHoursRepository(): IWorkingHoursRepository
}