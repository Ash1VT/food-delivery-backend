import { PrismaClient } from "@prisma/client";
import { OrderItemCreateInput, OrderItemModel, OrderItemUpdateInput } from "../../../models/orderItem.models";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import IOrderItemRepository from "../../interfaces/IOrderItemRepository";
import { OrderItemDelegate } from "./delegates";


export default class PrismaOrderItemRepository extends PrismaBaseRepository<OrderItemDelegate, OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput> implements IOrderItemRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.orderItem)
    }

    public async getOrderItems(orderId: bigint): Promise<OrderItemModel[]> {
        return await this.delegate.findMany({
            where: {
                orderId
            }
        })
    }
    
}