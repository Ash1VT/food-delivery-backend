import { PrismaClient } from "@prisma/client";
import { OrderCreateInput, OrderModel, OrderUpdateInput } from "../../models/order";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import IOrderRepository from "../interfaces/IOrderRepository";
import { OrderDelegate } from "./delegates";
import { OrderStatus } from "../../models/orderStatus";

export default class PrismaOrderRepository extends PrismaBaseRepository<OrderDelegate, OrderModel, OrderCreateInput, OrderUpdateInput> implements IOrderRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.order)
    }

    
    public async getOne(id: bigint, includeItems?: boolean): Promise<OrderModel | null> {
        return await this.delegate.findFirst({
            where: {
                id
            },
            include: {
                items: !!includeItems
            }
        })
    }

    public async getMany(includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                status
            },
            include: {
                items: !!includeItems
            }
        })
    }

    public async create(data: OrderCreateInput): Promise<OrderModel> {
        return await this.delegate.create({
            data,
            include: {
                items: true
            }                
        })
    }

    public async getCustomerOrders(customerId: bigint, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                customerId,
                status
            },
            include: {
                items: !!includeItems
            }
        })
    }

    public async getRestaurantOrders(restaurantId: bigint, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                restaurantId,
                status
            },
            include: {
                items: !!includeItems
            }
        })
    }
    
    public async getCourierOrders(courierId: bigint, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                courierId,
                status
            },
            include: {
                items: !!includeItems
            }
        })
    }
}