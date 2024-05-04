import IRestaurantMapperFactory from "@src/modules/restaurants/mappers/factories/interfaces/IRestaurantMapperFactory";
import IRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/interfaces/IRestaurantRepositoryFactory";
import RestaurantService from "../../../implementations/RestaurantService";
import IRestaurantService from "../../../interfaces/IRestaurantService";
import IRestaurantServiceFactory from "../../interfaces/IRestaurantServiceFactory";
import { PrismaClient } from "@prisma/client";
import RestaurantMapperFactory from "@src/modules/restaurants/mappers/factories/implementations/RestaurantMapperFactory";
import PrismaRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/implementations/prisma/PrismaRestaurantRepositoryFactory";
import IUserRepositoryFactory from "@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory";
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";

export default class PrismaRestaurantServiceFactory implements IRestaurantServiceFactory {
    protected restaurantMapperFactory: IRestaurantMapperFactory = new RestaurantMapperFactory()
    protected restaurantRepositoryFactory: IRestaurantRepositoryFactory
    protected userRepositoryFactory: IUserRepositoryFactory

    constructor(prismaClient: PrismaClient) {
        this.restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
        this.userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
    }

    public createRestaurantService(): IRestaurantService {
        return new RestaurantService(
            this.restaurantMapperFactory.createRestaurantCreateMapper(),
            this.restaurantMapperFactory.createRestaurantUpdateMapper(),
            this.restaurantRepositoryFactory.createRestaurantRepository(),
            this.userRepositoryFactory.createRestaurantManagerRepository()
        );
    }
}