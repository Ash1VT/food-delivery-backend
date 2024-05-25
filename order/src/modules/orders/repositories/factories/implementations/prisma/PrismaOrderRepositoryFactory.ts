import { PrismaClient } from "@prisma/client";
import PrismaOrderItemRepository from "../../../implementations/prisma/PrismaOrderItemRepository";
import PrismaOrderRepository from "../../../implementations/prisma/PrismaOrderRepository";
import IOrderItemRepository from "../../../interfaces/IOrderItemRepository";
import IOrderRepository from "../../../interfaces/IOrderRepository";
import IOrderRepositoryFactory from "../../interfaces/IOrderRepositoryFactory";
import IDeliveryInformationRepository from "../../../interfaces/IDeliveryInformationRepository";
import PrismaDeliveryInformationRepository from "../../../implementations/prisma/PrismaDeliveryInformationRepository";
import IPriceInformationRepository from "../../../interfaces/IPriceInformationRepository";
import PrismaPriceInformationRepository from "../../../implementations/prisma/PrismaPriceInformationRepository";

export default class PrismaOrderRepositoryFactory implements IOrderRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createOrderRepository(): IOrderRepository {
        return new PrismaOrderRepository(this.prismaClient)
    }

    public createOrderItemRepository(): IOrderItemRepository {
        return new PrismaOrderItemRepository(this.prismaClient)
    }

    public createDeliveryInformationRepository(): IDeliveryInformationRepository {
        return new PrismaDeliveryInformationRepository(this.prismaClient)
    }

    public createPriceInformationRepository(): IPriceInformationRepository {
        return new PrismaPriceInformationRepository(this.prismaClient)
    }
}