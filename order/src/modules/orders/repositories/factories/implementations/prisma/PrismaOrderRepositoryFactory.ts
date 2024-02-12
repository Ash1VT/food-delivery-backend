import { PrismaClient } from "@prisma/client";
import OrderItemRepository from "../../../implementations/prisma/PrismaOrderItemRepository";
import PrismaOrderRepository from "../../../implementations/prisma/PrismaOrderRepository";
import IOrderItemRepository from "../../../interfaces/IOrderItemRepository";
import IOrderRepository from "../../../interfaces/IOrderRepository";
import IOrderRepositoryFactory from "../../interfaces/IOrderRepositoryFactory";

export default class PrismaOrderRepositoryFactory implements IOrderRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createOrderRepository(): IOrderRepository {
        return new PrismaOrderRepository(this.prismaClient)
    }

    public createOrderItemRepository(): IOrderItemRepository {
        return new OrderItemRepository(this.prismaClient)
    }
}