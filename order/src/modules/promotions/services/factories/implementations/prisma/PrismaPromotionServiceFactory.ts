import IPromocodeService from "../../../interfaces/IPromocodeService";
import IPromotionServiceFactory from "../../interfaces/IPromotionServiceFactory";
import { PrismaClient } from "@prisma/client";
import IPromotionMapperFactory from "@src/modules/promotions/mappers/factories/interfaces/IPromotionMapperFactory";
import PromotionMapperFactory from "@src/modules/promotions/mappers/factories/implementations/PromotionMapperFactory";
import IPromotionRepositoryFactory from "@src/modules/promotions/repositories/factories/interfaces/IPromotionRepositoryFactory";
import PrismaPromotionRepositoryFactory from "@src/modules/promotions/repositories/factories/implementations/prisma/PrismaPromotionRepositoryFactory";
import PrismaRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/implementations/prisma/PrismaRestaurantRepositoryFactory";
import IRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/interfaces/IRestaurantRepositoryFactory";
import PromocodeService from "../../../implementations/PromocodeService";

export default class PrismaPromotionServiceFactory implements IPromotionServiceFactory {
    protected promotionMapperFactory: IPromotionMapperFactory = new PromotionMapperFactory()
    protected promotionRepositoryFactory: IPromotionRepositoryFactory
    protected restaurantRepositoryFactory: IRestaurantRepositoryFactory

    constructor(prismaClient: PrismaClient) {
        this.promotionRepositoryFactory = new PrismaPromotionRepositoryFactory(prismaClient)
        this.restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
    }

    public createPromocodeService(): IPromocodeService {
        return new PromocodeService(
            this.promotionMapperFactory.createPromocodeGetMapper(),
            this.promotionMapperFactory.createPromocodeCreateMapper(),
            this.promotionMapperFactory.createPromocodeUpdateMapper(),
            this.promotionRepositoryFactory.createPromocodeRepository(),
            this.restaurantRepositoryFactory.createRestaurantRepository()
        )
    }

}