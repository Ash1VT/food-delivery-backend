import IRestaurantRepository from "../../interfaces/IRestaurantRepository";

export default interface IRestaurantRepositoryFactory {
    createRestaurantRepository(): IRestaurantRepository;
}