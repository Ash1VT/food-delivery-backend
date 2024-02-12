import IRestaurantService from "../../interfaces/IRestaurantService";

export default interface IRestaurantServiceFactory {
    createRestaurantService(): IRestaurantService;
}