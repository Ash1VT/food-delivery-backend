import { PrismaClient } from "@prisma/client";
import { OrderItemCreateInput, OrderItemModel, OrderItemUpdateInput } from "../../models/orderItem";
import PrismaBaseRepository from "@src/base/repositories/prisma/PrismaBaseRepository";
import IOrderItemRepository from "../interfaces/IOrderItemRepository";
import { OrderItemDelegate } from "./delegates";


export default class OrderItemRepository extends PrismaBaseRepository<OrderItemDelegate, OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput>
                                         implements IOrderItemRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.orderItem)
    }
    
}