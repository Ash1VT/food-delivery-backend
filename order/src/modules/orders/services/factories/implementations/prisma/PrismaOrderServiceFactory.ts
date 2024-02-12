import { PrismaClient } from "@prisma/client"
import PrismaMenuItemRepositoryFactory from "@src/modules/menu/repositories/factories/implementations/prisma/PrismaMenuItemRepositoryFactory"
import IMenuItemRepositoryFactory from "@src/modules/menu/repositories/factories/interfaces/IMenuItemRepositoryFactory"
import { OrderMapperFactory } from "@src/modules/orders/mappers/factories/implementations/OrderMapperFactory"
import { IOrderMapperFactory } from "@src/modules/orders/mappers/factories/interfaces/IOrderMapperFactory"
import PrismaOrderRepositoryFactory from "@src/modules/orders/repositories/factories/implementations/prisma/PrismaOrderRepositoryFactory"
import IOrderRepositoryFactory from "@src/modules/orders/repositories/factories/interfaces/IOrderRepositoryFactory"
import PrismaRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/implementations/prisma/PrismaRestaurantRepositoryFactory"
import IRestaurantRepositoryFactory from "@src/modules/restaurants/repositories/factories/interfaces/IRestaurantRepositoryFactory"
import { OrderItemService } from "../../../implementations/OrderItemService"
import OrderService from "../../../implementations/OrderService"
import IOrderItemService from "../../../interfaces/IOrderItemService"
import IOrderService from "../../../interfaces/IOrderService"
import IOrderServiceFactory from "../../interfaces/IOrderServiceFactory"
import IPromotionRepositoryFactory from "@src/modules/promotions/repositories/factories/interfaces/IPromotionRepositoryFactory"
import PrismaPromotionRepositoryFactory from "@src/modules/promotions/repositories/factories/implementations/prisma/PrismaPromotionRepositoryFactory"

export default class PrismaOrderServiceFactory implements IOrderServiceFactory {
    protected orderMapperFactory: IOrderMapperFactory = new OrderMapperFactory()
    protected orderRepositoryFactory: IOrderRepositoryFactory
    protected promotionRepositoryFactory: IPromotionRepositoryFactory
    protected menuItemRepositoryFactory: IMenuItemRepositoryFactory
    protected restaurantRepositoryFactory: IRestaurantRepositoryFactory

    constructor(prismaClient: PrismaClient) {
        this.orderRepositoryFactory = new PrismaOrderRepositoryFactory(prismaClient)
        this.promotionRepositoryFactory = new PrismaPromotionRepositoryFactory(prismaClient)
        this.menuItemRepositoryFactory = new PrismaMenuItemRepositoryFactory(prismaClient)
        this.restaurantRepositoryFactory = new PrismaRestaurantRepositoryFactory(prismaClient)
    }

    public createOrderService(): IOrderService {
        return new OrderService(
            this.orderMapperFactory.createOrderGetMapper(),
            this.orderMapperFactory.createOrderCreateMapper(),
            this.orderRepositoryFactory.createOrderRepository(),
            this.promotionRepositoryFactory.createPromocodeRepository(),
            this.menuItemRepositoryFactory.createMenuItemRepository(),
            this.restaurantRepositoryFactory.createRestaurantRepository()
        )
    }
    
    public createOrderItemService(): IOrderItemService {
        return new OrderItemService(
            this.orderMapperFactory.createOrderItemGetMapper(),
            this.orderMapperFactory.createOrderItemCreateMapper(),
            this.orderRepositoryFactory.createOrderItemRepository(),
            this.orderRepositoryFactory.createOrderRepository(),
            this.menuItemRepositoryFactory.createMenuItemRepository()
        )
    }
}