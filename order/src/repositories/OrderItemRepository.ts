import { PrismaClient } from "@prisma/client";
import { OrderItemCreateInput, OrderItemDelegate, OrderItemModel, OrderItemUpdateInput } from "./types/orderItem.type";
import BaseRepository from "./BaseRepository";


export default class OrderItemRepository extends BaseRepository<OrderItemDelegate, OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.orderItem)
    }
    
}