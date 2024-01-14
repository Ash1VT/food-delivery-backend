import { PrismaClient } from "@prisma/client";
import { OrderCreateInput, OrderDelegate, OrderModel, OrderUpdateInput } from "./types/order.type";
import BaseRepository from "./BaseRepository";


export default class OrderRepository extends BaseRepository<OrderDelegate, OrderModel, OrderCreateInput, OrderUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.order)
    }
    
}