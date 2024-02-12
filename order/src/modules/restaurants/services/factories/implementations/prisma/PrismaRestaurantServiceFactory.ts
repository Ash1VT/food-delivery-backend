import IRestaurantMapperFactory from "@src/modules/restaurants/mappers/factories/interfaces/IRestaurantMapperFactory";
import IRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/interfaces/IRestaurantRepositoryFactory";
import RestaurantService from "../../../implementations/RestaurantService";
import IRestaurantService from "../../../interfaces/IRestaurantService";
import IRestaurantServiceFactory from "../../interfaces/IRestaurantServiceFactory";
import { PrismaClient } from "@prisma/client";
import RestaurantMapperFactory from "@src/modules/restaurants/mappers/factories/implementations/RestaurantMapperFactory";
import PrismaRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/implementations/prisma/PrismaRestaurantRepositoryFactory";

export default class PrismaRestaurantServiceFactory implements IRestaurantServiceFactory {
    protected restaurantMapperFactory: IRestaurantMapperFactory = new RestaurantMapperFactory()
    protected restaurantRepositoryFactory: IRestaurantRepositoryFactory

    constructor(prismaClient: PrismaClient) {
        this.restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
    }

    public createRestaurantService(): IRestaurantService {
        return new RestaurantService(
            this.restaurantMapperFactory.createRestaurantCreateMapper(),
            this.restaurantRepositoryFactory.createRestaurantRepository()
        );
    }
}